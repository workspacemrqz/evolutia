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
  source: text("source"), // origem do formulário: homepage, formulario
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDiagnosticResponseSchema = createInsertSchema(diagnosticResponses);

export const deleteDiagnosticResponseSchema = z.object({
  id: z.number().positive(),
});

// Partial schema for auto-save functionality
export const partialDiagnosticResponseSchema = insertDiagnosticResponseSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDiagnosticResponse = z.infer<typeof insertDiagnosticResponseSchema>;
export type PartialDiagnosticResponse = z.infer<typeof partialDiagnosticResponseSchema>;
export type DiagnosticResponse = typeof diagnosticResponses.$inferSelect;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const expenseSchema = z.object({
  item: z.string().min(1, "Item é obrigatório"),
  description: z.string().optional(),
  value: z.string().min(1, "Valor é obrigatório"),
  paidBy: z.string().min(1, "Responsável pelo pagamento é obrigatório"),
  projectId: z.number().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  links: z.string().optional(),
  pdfPath: z.string().optional(),
  imagePath: z.string().optional(),
  revenue: z.string().min(1, "Faturamento é obrigatório"),
});

export type Expense = z.infer<typeof expenseSchema> & {
  id: number;
  createdAt: string;
};

export type Project = z.infer<typeof projectSchema> & {
  id: number;
  createdAt: string;
  totalCosts: number;
};