import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const diagnosticResponses = pgTable("diagnostic_responses", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  position: text("position"),
  customPosition: text("custom_position"),
  revenue: text("revenue"),
  employees: text("employees"),
  erp: text("erp"),
  areas: text("areas").default("[]"), // JSON string of array
  timeConsumingProcess: text("time_consuming_process"),
  lostOpportunities: text("lost_opportunities"),
  status: text("status").default("Pendente"), // Pendente, Visto, Atendido
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDiagnosticResponseSchema = createInsertSchema(diagnosticResponses).omit({
  id: true,
  createdAt: true,
});

// Partial schema for auto-save functionality
export const partialDiagnosticResponseSchema = insertDiagnosticResponseSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDiagnosticResponse = z.infer<typeof insertDiagnosticResponseSchema>;
export type PartialDiagnosticResponse = z.infer<typeof partialDiagnosticResponseSchema>;
export type DiagnosticResponse = typeof diagnosticResponses.$inferSelect;