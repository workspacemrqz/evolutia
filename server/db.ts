import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema.js';
import { pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

export const client = postgres(process.env.DATABASE_URL!, {
  ssl: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10
});

export const db = drizzle(client, { schema });

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  customPosition: text("custom_position"),
  revenue: text("revenue").notNull(),
  employees: text("employees").notNull(),
  erp: text("erp").notNull(),
  areas: text("areas").notNull(),
  timeConsumingProcess: text("time_consuming_process").notNull(),
  lostOpportunities: text("lost_opportunities").notNull(),
  source: text("source"),
  status: text("status").default("Pendente"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  item: text("item").notNull(),
  description: text("description"),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  paidBy: text("paid_by").notNull(),
  projectId: serial("project_id").references(() => projects.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  links: text("links"),
  pdfPath: text("pdf_path"),
  imagePath: text("image_path"),
  revenue: text("revenue").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});