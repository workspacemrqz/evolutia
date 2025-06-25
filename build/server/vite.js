import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
const viteLogger = createLogger();
export function log(message, source = "vite") {
    const t = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${t} [${source}] ${message}`);
}
export async function setupVite(app, server) {
    const vite = await createViteServer({
        ...viteConfig,
        configFile: false,
        customLogger: {
            ...viteLogger,
            error: (msg, opts) => {
                viteLogger.error(msg, opts);
                process.exit(1);
            },
        },
        server: {
            middlewareMode: true,
            hmr: { server },
            allowedHosts: true,
        },
        appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
        try {
            const tplPath = path.resolve(process.cwd(), "client", "index.html");
            let template = await fs.promises.readFile(tplPath, "utf-8");
            template = template.replace('src="/src/main.tsx"', `src="/src/main.tsx?v=${nanoid()}"`);
            const html = await vite.transformIndexHtml(req.originalUrl, template);
            res
                .status(200)
                .set({ "Content-Type": "text/html" })
                .end(html);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
}
export function serveStatic(app) {
    const distPath = path.join(process.cwd(), "dist", "public");
    if (!fs.existsSync(distPath)) {
        throw new Error(`build dir missing: ${distPath}`);
    }
    app.use(express.static(distPath));
    app.use("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}
