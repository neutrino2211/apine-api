import { Request, Response } from "express";
import { errorHandler, successHandler } from "../../utils/api";
import md5 from "md5";
import { generateAccessToken } from "../../utils/crypto";
import { UserRepository } from "../../models/user";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRes = await UserRepository.whereEqualTo("email", email).findOne();

    if (userRes == null) return errorHandler(res, "Invalid email or password", 401);

    const user = userRes;

    if (user.password !== md5(password)) return errorHandler(res, "Invalid email or password", 401);

    return successHandler(res, "Logged in successfully", {
        user,
        token: generateAccessToken(user.id, 1000 * 60 * 30, md5(user.email!!))
    })
}