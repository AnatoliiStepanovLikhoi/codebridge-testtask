import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  database: "your_database_name",
  username: "your_username",
  password: "your_password",
  host: "your_host",
  dialect: "mssql",
};

export default dbConfig;
