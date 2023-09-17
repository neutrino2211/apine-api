import { Collection, getRepository } from "fireorm";

function generateRandomString(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
    }

    return result;
}

const apiKeyGen = () => "apine_" + generateRandomString(32)

@Collection()
export class Project {
    id: string = "";
    apiKey: string = apiKeyGen();
    name: string = "";
    logo: string = "";

    owner: string = "";

    workspace: string = "";
}

export const ProjectRepository = getRepository(Project)