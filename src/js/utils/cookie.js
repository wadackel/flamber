// @flow
import moment from "moment";
import cookie from "react-cookie";
import * as C from "../constants/cookie";

export function load(name: string) {
  return cookie.load(name);
}

export function save(name: string, val: any, opt?: CookieOptions = {}): void {
  const options = {
    path: C.PATH,
    secure: C.SECURE,
    expires: moment().add(C.EXPIRES, "days").toDate(),
    ...opt
  };

  cookie.save(name, val, options);
}

export function remove(name: string, opt?: CookieOptions = {}): void {
  const options = {
    path: C.PATH,
    secure: C.SECURE,
    ...opt
  };

  cookie.remove(name, options);
}

export function loadToken(): string {
  return load(C.TOKEN_KEY);
}

export function saveToken(token: string): void {
  save(C.TOKEN_KEY, token);
}

export function removeToken(): void {
  remove(C.TOKEN_KEY);
}
