import { Response, Request } from "express";
import { User } from "../models/user";
export type RequestWithUser = Request & {user: User}

export function successHandler(res: Response, message: string, data: any) {
    res.json({
        success: true,
        message,
        data
    })
}

export function errorHandler(res: Response, message: string, code: number = 500) {
    res.json({
        success: false,
        message,
    }).status(code)
}