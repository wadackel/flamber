import moment from "moment";
import cookie from "react-cookie";
import * as C from "../constants/cookie";

export function load(name) {
  return cookie.load(name);
}

export function save(name, val, opt = {}) {
  const options = {
    path: C.PATH,
    secure: C.SECURE,
    expires: moment().add(C.EXPIRES, "days").toDate(),
    ...opt
  };

  return cookie.save(name, val, options);
}

export function remove(name, opt = {}) {
  const options = {
    path: C.PATH,
    secure: C.SECURE,
    ...opt
  };

  return cookie.remove(name, options);
}

export function loadToken() {
  return load(C.TOKEN_KEY);
}

export function saveToken(token) {
  return save(C.TOKEN_KEY, token);
}

export function removeToken() {
  return remove(C.TOKEN_KEY);
}
