import queryString from "query-string";
import fetch from "../utils/fetch";
import openPopup from "../utils/popup";
import * as AuthProviders from "../constants/auth-providers";
import { URL_ROOT } from "../constants/application";

export const AUTH_ENDPOINT = `${URL_ROOT}/auth`;

const POPUP_CONFIG = {
  [AuthProviders.GOOGLE]: {
    width: 452,
    height: 634
  }
};


export function fetchUser(token) {
  return fetch(`${AUTH_ENDPOINT}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


function listenForCredentials(popup, resolve, reject) {
  let query = {};

  try {
    query = queryString.parse(popup.location.search);
  } catch (error) {}

  if (popup.closed || query.s === "failure") {
    reject({ error: "cancel" });

  } else if (query.s === "success" && query.t) {
    popup.close();
    fetchUser(query.t).then(resolve).catch(reject);

  } else {
    setTimeout(() => {
      listenForCredentials(popup, resolve, reject);
    }, 0);
  }
}


export function authenticate(provider) {
  return new Promise((resolve, reject) => {
    const config = POPUP_CONFIG[provider];
    const popup = openPopup(`/auth/${provider}`, `${provider}authpopup`, config);
    listenForCredentials(popup, resolve, reject);
  });
}
