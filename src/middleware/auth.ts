import { Request, Response, NextFunction } from "express";
import { RequestWithUser, errorHandler } from "../utils/api";
import { decoupleAccessToken } from "../utils/crypto";
import md5 from "md5";
import { User, UserRepository } from "../models/user";
export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userToken = req.headers['x-apine-token'] as string;
    const userEmail = req.headers['x-apine-email'] as string;

    if (!userToken || !userEmail) return errorHandler(res, "Unauthorised", 401);

    const data = decoupleAccessToken(userToken, md5(userEmail))

    console.log(data)

    if (Date.now() > Number(data.expiresIn)) return errorHandler(res, "Token expired", 403)

    const user = await UserRepository.whereEqualTo("email", userEmail).findOne();

    if (user == null) return errorHandler(res, "Unauthorised", 401);

    req.user = user;

    next();
}