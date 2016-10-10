// @flow
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJSON from "../db.config.json";

const db = {};
const env = process.env.NODE_ENV || "development";
const config = configJSON[env];
export const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].hasOwnProperty("associate")) {
    db[modelName].associate(db);
  }
});

export default db;
