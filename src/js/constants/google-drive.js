"use strict";

import dotenv from "dotenv"
dotenv.config();

export const VERSION = "v3";
export const SPACES = "appDataFolder";
export const SCOPES = ["https://www.googleapis.com/auth/drive.appdata"];
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URL = process.env.REDIRECT_URL;
