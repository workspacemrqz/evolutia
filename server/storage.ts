import {
  User,
  InsertUser,
  DiagnosticResponse,
  InsertDiagnosticResponse,
  PartialDiagnosticResponse
} from "@shared/schema";
import { users, diagnosticResponses } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDiagnosticResponse(
    response: InsertDiagnosticResponse | PartialDiagnosticResponse
  ): Promise<DiagnosticResponse>;
  getAllDiagnosticResponses(): Promise<DiagnosticResponse[]>;
  updateDiagnosticResponseStatus(
    id: number,
    status: string
  ): Promise<DiagnosticResponse>;
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createDiagnosticResponse(data: InsertDiagnosticResponse | PartialDiagnosticResponse): Promise<DiagnosticResponse> {
    const [diagnosticResponse] = await db
      .insert(diagnosticResponses)
      .values(data)
      .returning();
    return diagnosticResponse;
  }

  async getAllDiagnosticResponses(): Promise<DiagnosticResponse[]> {
    return db
      .select()
      .from(diagnosticResponses)
      .orderBy(diagnosticResponses.createdAt);
  }

  async updateDiagnosticResponseStatus(
    id: number,
    status: string
  ): Promise<DiagnosticResponse> {
    const [updatedResponse] = await db
      .update(diagnosticResponses)
      .set({ status })
      .where(eq(diagnosticResponses.id, id))
      .returning();
    return updatedResponse;
  }
}

export const storage = new DatabaseStorage();