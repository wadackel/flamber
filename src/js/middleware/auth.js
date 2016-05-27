"use strict";

import Google from "googleapis";
import GoogleAuth from "google-auth-library";
import * as C from "../constants/cookie";
import {
  VERSION,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SPACES,
  SCOPES
} from "../constants/google-drive";


export default function authMiddleware(req, res, next) {
  const token = req.cookies[C.CREDS_KEY];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  req.oauth2Client = oauth2Client;
  req.authenticateURL = url;

  if (!token) {
    req.authenticated = false;
    return next();
  }

  oauth2Client.credentials = token;

  const drive = Google.drive({
    version: VERSION,
    auth: oauth2Client,
    params: {
      spaces: SPACES
    }
  });

  req.authenticated = true;
  req.drive = drive;

  next();
}
