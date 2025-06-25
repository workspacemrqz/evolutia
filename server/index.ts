import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";

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
      log(line, "express");
    }
  });
  next();
});

(async () => {
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const staticPath = path.join(process.cwd(), "dist", "public");
    app.use(express.static(staticPath));
    app.use("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = Number(process.env.PORT) || 3001;
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`, "express");
  });
})();