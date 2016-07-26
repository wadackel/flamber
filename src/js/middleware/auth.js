import * as C from "../constants/cookie";
import { getOauth2Client, getAuthUrl, getDrive } from "../utils/drive";
import { fetchUser, refreshAccessToken } from "../utils/verify-auth";

export default function authMiddleware(req, res, next) {
  const token = req.cookies[C.CREDS_KEY];
  const config = req.cookies[C.CONFIG_KEY];
  const oauth2Client = getOauth2Client();
  const url = getAuthUrl(oauth2Client);

  req.oauth2Client = oauth2Client;
  req.authenticateURL = url;

  if (!token) {
    req.authenticated = false;

    return next();
  }

  const drive = getDrive(oauth2Client, token);
  const configObj = JSON.parse(config || "{}");

  refreshAccessToken(oauth2Client, configObj.expiry_date)
    .then(() => fetchUser(oauth2Client, token))
    .then(user => {
      req.authenticated = true;
      req.user = user;
      req.drive = drive;
      next();
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
      req.authenticated = false;
      req.user = null;
      req.drive = null;
      next();
    });
}
