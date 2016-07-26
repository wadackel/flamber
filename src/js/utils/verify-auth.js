import { getDrive } from "./drive";
import User from "../models/user";

// FIXME: Refactor
export function fetchUser(oauth2Client, token) {
  return new Promise((resolve, reject) => {
    const drive = getDrive(oauth2Client, token);

    drive.about.get({
      fields: "user, storageQuota"
    }, (err, res) => {
      if (err) {
        reject(err);

        return;
      }

      const profile = Object.assign({}, res.user, res.storageQuota);

      User.findOne({ email: profile.emailAddress }, (dbError, user) => {
        if (dbError || !user) {
          // TODO: Responding to other providers
          User.createProviderFactory("google", profile, (createError, newUser) => {
            if (createError) {
              reject(createError);
            } else {
              resolve(newUser);
            }
          });

        } else {
          resolve(user);
        }
      });
    });
  });
}

export function fetchToken(oauth2Client, code) {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log("Error while trying to retrieve access token", err); // eslint-disable-line no-console
        reject(err);

        return;
      }

      resolve(token);
    });
  });
}

export default function verifyAuth(oauth2Client, code) {
  return new Promise((resolve, reject) => {
    let token = null;

    fetchToken(oauth2Client, code)
      .then(_token => {
        token = _token;

        return fetchUser(oauth2Client, token);
      })
      .then(user => {
        resolve({ user, token });
      })
      .catch(err => reject({ error: err }));
  });
}

export function refreshAccessToken(oauth2Client, expiryDate) {
  return new Promise((resolve, reject) => {
    if (!expiryDate || new Date() <= new Date(expiryDate)) {
      resolve();

      return;
    }

    oauth2Client.refreshAccessToken((err, tokens) => {
      if (err) {
        return reject(err);
      }

      resolve(tokens);
    });
  });
}
