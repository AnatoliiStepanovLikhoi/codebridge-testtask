import * as sql from "mssql";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DOGS_TABLE = "Dogs";

const initDb = async () => {
  try {
    await sql.connect(
      {
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        driver: require("msnodesqlv8"),
        options: {
          trustedConnection: true,
        },
      },
      function (err) {
        if (err) throw err;

        console.log("database connected");
      }
    );

    // const query = `IF DB_ID('${process.env.DB_NAME}') IS NULL CREATE DATABASE ${process.env.DB_NAME}`;
    // await sql.query(query);

    const sequelize = new Sequelize({
      dialect: "mssql",
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      dialectOptions: {
        trustedConnection: true,
      },
    });

    // const sequelize = new Sequelize({
    //   dialect: "mssql",
    //   dialectModule: require("msnodesqlv8"),
    //   dialectOptions: {
    //     connectionString:
    //       "Driver={SQL Server Native Client 11.0};Server=localhostSQLEXPRESS01;Database=master;Trusted_Connection=True;",
    //     trustedConnection: true,
    //   },
    // });

    const dogs = sequelize.define(
      DOGS_TABLE,
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tail_length: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: DOGS_TABLE,
      }
    );

    await dogs.sync();
  } catch (error) {
    console.error("Error initializing database:", error.stack);
  }
};

export { initDb, DOGS_TABLE };
