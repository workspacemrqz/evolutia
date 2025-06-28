
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express, { type Request, Response, NextFunction } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import { createServer } from "http";
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const url = req.path;
  let captured: any;
  const origJson = res.json;
  res.json = function (body, ...args) {
    captured = body;
    return origJson.apply(res, [body, ...args]);
  };
  res.on("finish", () => {
    if (url.startsWith("/api")) {
      let line = `${req.method} ${url} ${res.statusCode} in ${Date.now() - start}ms`;
      if (captured) line += ` :: ${JSON.stringify(captured)}`;
      if (line.length > 80) line = line.slice(0, 79) + "…";
      console.log(`[express] ${line}`);
    }
  });
  next();
});

// Serve static files from the client/src directory for preview
app.use(express.static(path.join(process.cwd(), "client/src")));
app.use(express.static(path.join(process.cwd(), "client")));

// Simple route for testing
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Preview server running" });
});

// Serve the main HTML file for all routes (SPA behavior)
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client/index.html"));
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
  console.error(err);
});

const port = 5000; // Porta recomendada para Replit
const host = "0.0.0.0"; // Necessário para Replit expor a porta

server.listen(port, host, () => {
  console.log(`[express] Preview server running on ${host}:${port}`);
  console.log(`Preview available at: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPLIT_DEV_DOMAIN || 'replit.dev'}`);
});
