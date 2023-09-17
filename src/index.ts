import "./utils/firebase";

import express from "express";
import bodyParser from "body-parser";

import env from "dotenv";
env.config();

import auth from "./routes/auth";
import workspaces from "./routes/workspaces";

const app = express();
const PORT = process.env.PORT || 5051;

app.use(bodyParser.json({limit: '50mb'}))

auth(app);
workspaces(app);

app.listen(PORT, () => {
    console.log("Listening...", PORT)
})