import { Router } from "express";
import { signUp } from "./signup";
import { login } from "./login";

export default function load(app: Router) {
    app.post("/auth/signup", signUp)

    app.post('/auth/login', login);
}