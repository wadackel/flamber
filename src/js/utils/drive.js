import Google from "googleapis";
import GoogleAuth from "google-auth-library";
import {
  VERSION,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SPACES,
  SCOPES
} from "../constants/google-drive";

export function getOauth2Client() {
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  return oauth2Client;
}

export function getAuthUrl(oauth2Client) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // eslint-disable-line camelcase
    scope: SCOPES
  });
}

export function getDrive(oauth2Client, token) {
  const credentials = typeof token === "string" ? JSON.parse(token) : token;
  oauth2Client.setCredentials(credentials);

  const drive = Google.drive({
    version: VERSION,
    auth: oauth2Client,
    params: {
      spaces: SPACES
    }
  });

  return drive;
}
