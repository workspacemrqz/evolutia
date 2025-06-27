import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, initializeAdminUser } from "./auth";
import { storage } from "./storage";
import { insertDiagnosticResponseSchema, partialDiagnosticResponseSchema, expenseSchema } from "@shared/schema";
import { db, users, responses, expenses } from "./db";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize admin user
  await initializeAdminUser();

  // Setup authentication
  setupAuth(app);

  // Protected admin route
  app.get("/api/admin/responses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const responses = await storage.getAllDiagnosticResponses();
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch responses" });
    }
  });

  // Submit diagnostic response (supports partial submissions)
  app.post("/api/diagnostic", async (req, res) => {
    try {
      // Try full validation first, then partial if that fails
      let validatedData;
      try {
        validatedData = insertDiagnosticResponseSchema.parse(req.body);
      } catch (fullValidationError) {
        // If full validation fails, try partial validation
        validatedData = partialDiagnosticResponseSchema.parse(req.body);
      }

      const response = await storage.createDiagnosticResponse(validatedData);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Update response status
  app.patch("/api/admin/responses/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Pendente", "Visto", "Atendido"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const response = await storage.updateDiagnosticResponseStatus(parseInt(id), status);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  // Delete response
  app.delete("/api/admin/responses/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      await storage.deleteDiagnosticResponse(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Failed to delete response" });
    }
  });

  // Expenses routes
  app.get("/api/admin/expenses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const allExpenses = await db.select().from(expenses).orderBy(desc(expenses.createdAt));
      res.json(allExpenses);
    } catch (error) {
      console.error("Get expenses error:", error);
      res.status(500).json({ error: "Failed to fetch expenses" });
    }
  });

  app.post("/api/admin/expenses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const validatedData = expenseSchema.parse(req.body);

      const [newExpense] = await db.insert(expenses).values(validatedData).returning();
      res.status(201).json(newExpense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      }
      console.error("Create expense error:", error);
      res.status(500).json({ error: "Failed to create expense" });
    }
  });

  app.delete("/api/admin/expenses/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      await db.delete(expenses).where(eq(expenses.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error("Delete expense error:", error);
      res.status(500).json({ error: "Failed to delete expense" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}