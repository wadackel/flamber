import dotenv from "dotenv";
import jwt from "jwt-simple";
import uuid from "node-uuid";
import moment from "moment";

dotenv.config();
const { JWT_SECRET } = process.env;


export function encode(jwtObj) {
  return jwt.encode(jwtObj, JWT_SECRET);
}

export function decode(token) {
  return jwt.decode(token, JWT_SECRET);
}

export function generateToken(id, providerId) {
  const iat = moment();
  const exp = moment().add(1, "days");

  return jwt.encode({
    jti: uuid.v4(),
    iat: iat.valueOf(),
    exp: exp.valueOf(),
    id,
    providerId
  }, JWT_SECRET);
}

export function getVerifyToken(token) {
  const jwtObj = decode(token);

  if (Date.now <= jwtObj.exp) {
    throw new Error("有効期限の切れたトークンです");
  }

  return jwtObj;
}
