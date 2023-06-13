import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import bodyParser from "body-parser";
import { Sequelize, DataTypes, Model } from "sequelize";
import config from "./config";
dotenv.config();

const PORT: string | number = process.env.SERVER_PORT || 3000;

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
