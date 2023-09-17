import { Collection, getRepository } from "fireorm";
import { Project, ProjectRepository } from "./project";


@Collection()
export class User {
    id: string = "";
    role: 'admin' | 'attendant' = 'admin';
    name: string = "";
    email: string = "";
    picture: string = "";
    password: string = "";
    allowedProjects: string[] = [];
}

export const UserRepository = getRepository(User)