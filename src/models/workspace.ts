import { Collection, getRepository } from "fireorm";
import { User } from "./user";


@Collection()
export class Workspace {

    id: string = "";
    logo: string = "";
    name: string = "";

    owner: string = "";
}

export const WorkspaceRepository = getRepository(Workspace)