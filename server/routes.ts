import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { setupAuth, initializeAdminUser } from "./auth";
import { storage } from "./storage";
import { insertDiagnosticResponseSchema, partialDiagnosticResponseSchema, expenseSchema } from "@shared/schema";
import { db, users, responses, expenses, projects } from "./db.js";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure static directory exists
const staticDir = path.join(process.cwd(), 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer for file uploads
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize admin user
  await initializeAdminUser();

  // Setup authentication
  setupAuth(app);

  // Serve static files from uploads
  app.use('/projects', express.static(path.join(process.cwd(), 'static', 'projects')));

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

      // Convert value from string to number
      const expenseData = {
        ...validatedData,
        value: parseFloat(validatedData.value),
        projectId: validatedData.projectId || null,
      };

      const [newExpense] = await db.insert(expenses).values(expenseData).returning();
      res.status(201).json(newExpense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
        return;
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

  // Projects routes
  app.get("/api/admin/projects", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const projectsList = await db.select().from(projects).orderBy(desc(projects.createdAt));

      // Calculate total costs for each project
      const projectsWithCosts = await Promise.all(
        projectsList.map(async (project) => {
          const projectExpenses = await db
            .select()
            .from(expenses)
            .where(eq(expenses.projectId, project.id));

          const totalCosts = projectExpenses.reduce(
            (sum, expense) => sum + parseFloat(expense.value.toString()),
            0
          );

          return { ...project, totalCosts };
        })
      );

      res.json(projectsWithCosts);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/projects", upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]), async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      console.log("📝 Dados recebidos para criar projeto:", req.body);
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      let pdfUrl = null;
      let imageUrl = null;

      // Process PDF upload
      if (files.pdf && files.pdf[0]) {
        const pdfFile = files.pdf[0];
        const pdfPath = `projects/pdf_${Date.now()}_${pdfFile.originalname}`;
        // Move file to static directory for serving
        const staticPdfPath = path.join(process.cwd(), 'static', pdfPath);
        await fs.promises.mkdir(path.dirname(staticPdfPath), { recursive: true });
        await fs.promises.copyFile(pdfFile.path, staticPdfPath);
        await fs.promises.unlink(pdfFile.path); // Clean up temp file
        pdfUrl = `/${pdfPath}`;
      }

      // Process image upload
      if (files.image && files.image[0]) {
        const imageFile = files.image[0];
        const imagePath = `projects/img_${Date.now()}_${imageFile.originalname}`;
        // Move file to static directory for serving
        const staticImagePath = path.join(process.cwd(), 'static', imagePath);
        await fs.promises.mkdir(path.dirname(staticImagePath), { recursive: true });
        await fs.promises.copyFile(imageFile.path, staticImagePath);
        await fs.promises.unlink(imageFile.path); // Clean up temp file
        imageUrl = `/${imagePath}`;
      }

      const result = await db.insert(projects).values({
        title: req.body.title || null,
        description: req.body.description || null,
        links: req.body.links || null,
        pdfUrl,
        imageUrl,
        revenue: req.body.revenue || null,
      }).returning();

      console.log("✅ Projeto criado com sucesso:", result[0]);
      res.json(result[0]);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      await db.delete(projects).where(eq(projects.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  app.get("/api/admin/projects/:id/download", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
      if (project.length === 0) {
        return res.status(404).json({ error: "Project not found" });
      }

      // For now, return project data as JSON
      // In a real implementation, you would create a ZIP file with project files
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="projeto_${project[0].title.replace(/\s+/g, '_')}.json"`);
      res.json(project[0]);
    } catch (error) {
      console.error("Error downloading project:", error);
      res.status(500).json({ error: "Failed to download project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}