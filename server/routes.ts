import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, initializeAdminUser } from "./auth";
import { storage } from "./storage";
import { insertDiagnosticResponseSchema, partialDiagnosticResponseSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
