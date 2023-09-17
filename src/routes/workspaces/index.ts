import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { addProject, createWorkspace } from "./create";
import { createReport } from "./report";

export default function load(app: Router) {
    app.post("/workspace/", authMiddleware as any, createWorkspace as any);

    app.post("/workspace/:id", authMiddleware as any, addProject as any);

    app.post("/report", createReport)
}