import queryString from "query-string";
import fetch from "../utils/fetch";
import openPopup from "../utils/popup";

export const AUTH_VALIDATE_ENDPOINT = "/auth/validate";
export const AUTH_REVOKE_ENDPOINT = "/auth/revoke";


function listenForCredentials(popup, resolve, reject) {
  let params = {};

  try {
    params = queryString.parse(popup.location.search);
  } catch (err) {}

  if (params.code) {
    popup.close();

    fetch(`${AUTH_VALIDATE_ENDPOINT}?code=${params.code}`)
      .then(res => {
        if (res.status === "ok") {
          resolve(res);
        } else {
          reject({error: res.err});
        }
      })
      .catch(error => reject({error}));

  } else if (popup.closed) {
    reject({error: "cancel"});

  } else {
    setTimeout(() => {
      listenForCredentials(popup, resolve, reject);
    }, 0);
  }
}

export function authenticate(url) {
  return new Promise((resolve, reject) => {
    const popup = openPopup(url, "googleauthpopup");
    listenForCredentials(popup, resolve, reject);
  });
}

export function revokeCredentials() {
  return new Promise((resolve, reject) => {
    fetch(AUTH_REVOKE_ENDPOINT)
      .then(res => {
        if (res.status === "ok") {
          resolve();
        } else {
          reject({error: res.err});
        }
      })
      .catch(error => reject({error}));
  });
}
