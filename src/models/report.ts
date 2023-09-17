import { Collection, getRepository } from "fireorm";

@Collection()
export class Report {
    id: string = "";
    picture: string = "";
    dimensions: {width: number, height: number} = {width: 0, height: 0};
    comment: {coords: [number, number], message: string} = {
        coords: [0,0],
        message: ""
    };

    project: string = "";
}

export const ReportsRepository = getRepository(Report);