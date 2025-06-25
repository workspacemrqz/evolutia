import { users, diagnosticResponses } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
const PostgresSessionStore = connectPg(session);
export class DatabaseStorage {
    constructor() {
        this.sessionStore = new PostgresSessionStore({
            conString: process.env.DATABASE_URL,
            createTableIfMissing: true
        });
    }
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
    }
    async getUserByUsername(username) {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));
        return user;
    }
    async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
    }
    async createDiagnosticResponse(response) {
        const [diagnosticResponse] = await db
            .insert(diagnosticResponses)
            .values(response)
            .returning();
        return diagnosticResponse;
    }
    async getAllDiagnosticResponses() {
        return db
            .select()
            .from(diagnosticResponses)
            .orderBy(diagnosticResponses.createdAt);
    }
    async updateDiagnosticResponseStatus(id, status) {
        const [updatedResponse] = await db
            .update(diagnosticResponses)
            .set({ status })
            .where(eq(diagnosticResponses.id, id))
            .returning();
        return updatedResponse;
    }
}
export const storage = new DatabaseStorage();
