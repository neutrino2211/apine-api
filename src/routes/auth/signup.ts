import { Request, Response } from "express";
import { RequestWithUser, errorHandler, successHandler } from "../../utils/api";
import { User, UserRepository } from "../../models/user";
import { generateAccessToken } from "../../utils/crypto";
import md5 from "md5";

export const signUp =async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    let user = await UserRepository.whereEqualTo("email", email).findOne();

    if (user != null) return errorHandler(res, "User already exists", 402)

    console.log(email)

    user = new User();
    user.name = name;
    user.email = email;
    user.password = md5(password);

    console.log(user)

    user = await UserRepository.create(user);

    return successHandler(res, "User signed up successfully", {
        user,
        token: generateAccessToken(user.id, 1000 * 60 * 30, md5(user.email))
    });
}