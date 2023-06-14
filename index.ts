import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import bodyParser from "body-parser";
import { Sequelize, DataTypes, Model } from "sequelize";
// import config from "./config";
import { initDb } from "./src/db";

dotenv.config();

const PORT: string | number = process.env.SERVER_PORT || 3000;

const app: Express = express();

initDb()
  .then(() => {
    app.use(bodyParser.json());
    app.use(cors());

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initial");
    console.error(error.stack);
  });

// app.use(bodyParser.json());
// app.use(cors());

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
