type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
};

type Cookie = {
  load(name: string, doNotParse?: boolean): any;
  select(regex?: RegExp): any;
  save(name: string, val: any, opt?: CookieOptions): void;
  remove(name: string, opt: CookieOptions): void;
  setRawCookie(rawCookie: string): void;
  plugToRequest(req: any, res: any): Function;
};

declare module "react-cookie" {
  declare var exports: Cookie;
}
