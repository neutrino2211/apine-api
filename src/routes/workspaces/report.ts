import { Request, Response } from "express";
import { RequestWithUser, errorHandler, successHandler } from "../../utils/api";
import { ProjectRepository } from "../../models/project";
import { Report, ReportsRepository } from "../../models/report";

export async function createReport(req: Request, res: Response) {
    const apiKey = req.headers['x-apine-apikey'];

    if (!apiKey)  return errorHandler(res, "invalid api key", 400);

    const {picture, dimensions, comment} = req.body;

    const project = await ProjectRepository.whereEqualTo("apiKey", apiKey as string).findOne();

    if (project == null) return errorHandler(res, "invalid api key", 400);

    let report = new Report();

    report.project = project.id;
    report.dimensions = dimensions;
    report.picture = picture;
    report.comment = comment;

    report = await ReportsRepository.create(report);

    return successHandler(res, "report made successfully", {report})
}