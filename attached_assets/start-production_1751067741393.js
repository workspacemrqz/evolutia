#!/usr/bin/env node

import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import pkg from "pg";
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Utility functions
const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "@Ev0luTi42025_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Admin credentials (in production, use database)
const ADMIN_CREDENTIALS = [
  {
    id: 1,
    username: "contato@evolutoficial.com",
    password: "@Ev0luTi42025",
    canDelete: false,
  },
  {
    id: 2,
    username: "marquez@evolutoficial.com", 
    password: "@M4rqu3z851311",
    canDelete: true,
  }
];

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      const user = ADMIN_CREDENTIALS.find(
        cred => cred.username === username && cred.password === password
      );
      
      if (user) {
        return done(null, { 
          id: user.id, 
          username: user.username,
          canDelete: user.canDelete 
        });
      }
      return done(null, false, { message: "Invalid credentials" });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = ADMIN_CREDENTIALS.find(cred => cred.id === id);
  if (user) {
    done(null, { 
      id: user.id, 
      username: user.username,
      canDelete: user.canDelete 
    });
  } else {
    done(null, false);
  }
});

// Middleware de logging
app.use((req, res, next) => {
  const start = Date.now();
  const url = req.path;
  res.on("finish", () => {
    if (url.startsWith("/api")) {
      console.log(
        `${req.method} ${url} ${res.statusCode} in ${Date.now() - start}ms`,
      );
    }
  });
  next();
});

// Rota básica de health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Authentication routes
app.post("/api/login", (req, res, next) => {
  console.log("Login attempt:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Login error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user) {
      console.log("Login failed:", info);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("Login session error:", err);
        return res.status(500).json({ error: "Login failed" });
      }
      console.log("Login successful:", user.username);
      return res.json({ 
        success: true, 
        user: { 
          id: user.id,
          username: user.username,
          canDelete: user.canDelete || false
        }
      });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ success: true });
  });
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      user: {
        id: req.user.id,
        username: req.user.username,
        canDelete: req.user.canDelete || false
      }
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Middleware to protect admin routes
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
};

// Submit diagnostic response (supports partial submissions)
app.post("/api/diagnostic", async (req, res) => {
  try {
    console.log("Diagnostic submission received:", req.body);

    const {
      name,
      email,
      phone,
      company,
      position,
      customPosition,
      revenue,
      employees,
      erp,
      areas,
      timeConsumingProcess,
      lostOpportunities,
      source,
    } = req.body;

    // Insert into database using correct table structure
    const query = `
      INSERT INTO diagnostic_responses (
        name, email, phone, company, position, custom_position, 
        revenue, employees, erp, areas, time_consuming_process, 
        lost_opportunities, status, source, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
      RETURNING *
    `;

    const values = [
      name,
      email,
      phone,
      company,
      position,
      customPosition,
      revenue,
      employees,
      erp,
      Array.isArray(areas) ? JSON.stringify(areas) : areas,
      timeConsumingProcess,
      lostOpportunities,
      "Pendente",
      source,
    ];

    const result = await pool.query(query, values);

    console.log("Diagnostic saved successfully:", result.rows[0]);
    res.status(201).json({
      message: "Diagnostic received and saved",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error saving diagnostic:", error);
    res.status(500).json({ error: "Failed to save diagnostic" });
  }
});

// Protected admin routes
app.get("/api/admin/dashboard", requireAuth, (req, res) => {
  res.json({ message: "Admin dashboard data", user: req.user });
});

// Get all diagnostic responses (admin only)
app.get("/api/admin/responses", requireAuth, async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        position,
        custom_position as "customPosition",
        revenue,
        employees,
        erp,
        areas,
        time_consuming_process as "timeConsumingProcess",
        lost_opportunities as "lostOpportunities",
        status,
        source,
        created_at as "createdAt"
      FROM diagnostic_responses 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Failed to fetch responses" });
  }
});

// Update response status (admin only)
app.patch("/api/admin/responses/:id/status", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pendente", "Visto", "Atendido"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const query = `
      UPDATE diagnostic_responses 
      SET status = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete diagnostic response (only for users with canDelete permission)
app.delete("/api/admin/responses/:id", requireAuth, async (req, res) => {
  try {
    // Check if user has delete permission
    if (!req.user.canDelete) {
      return res.status(403).json({ error: "Permission denied. Only specific users can delete responses." });
    }

    const { id } = req.params;

    const query = `
      DELETE FROM diagnostic_responses 
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Response not found" });
    }

    console.log(`Response ${id} deleted by user ${req.user.username}`);
    res.json({ message: "Response deleted successfully", deletedResponse: result.rows[0] });
  } catch (error) {
    console.error("Error deleting response:", error);
    res.status(500).json({ error: "Failed to delete response" });
  }
});

// Servir arquivos estáticos
const staticPath = path.join(process.cwd(), "dist", "public");
app.use(express.static(staticPath));

app.use("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

const port = Number(process.env.PORT) || 3001;
const host = "0.0.0.0";

server.listen(port, host, () => {
  console.log(`serving on ${host}:${port}`);
});