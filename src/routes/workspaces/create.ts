import { Response } from "express";
import { RequestWithUser, errorHandler, successHandler } from "../../utils/api";
import { Workspace, WorkspaceRepository } from "../../models/workspace";
import { Project, ProjectRepository } from "../../models/project";
import { UserRepository } from "../../models/user";

export async function createWorkspace(req: RequestWithUser, res: Response) {
    if (req.user.role != 'admin') return errorHandler(res, "Unauthorised", 401);

    const { name } = req.body;

    let workspace = new Workspace();

    workspace.name = name;
    workspace.owner = req.user.id;

    workspace = await WorkspaceRepository.create(workspace)

    return successHandler(res, "workspace created successfully", {workspace})
}

export async function addProject(req: RequestWithUser, res: Response) {
    if (req.user.role != 'admin') return errorHandler(res, "Unauthorised", 401);

    const { name } = req.body;

    const { id } = req.params;

    let workspace = await WorkspaceRepository.whereEqualTo("id", id).findOne();

    if (workspace == null) return errorHandler(res, "workspace not found")

    let project = new Project()

    project.name = name;
    project.owner = req.user.id;
    project.workspace = workspace.id;
    
    project = await ProjectRepository.create(project);

    req.user.allowedProjects.push(project.id)

    await UserRepository.update(req.user);

    return successHandler(res, "project added to workspace", {project})
}