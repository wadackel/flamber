import cookie from "react-cookie";
import * as C from "../constants/cookie";
import User from "../models/user";

export default function authMiddleware(req, res, next) {
  const token = cookie.load(C.TOKEN_KEY);

  User.findByJwtToken(token)
    .then(user => {
      req.hasJwtToken = !!user;
      next();
    })
    .catch(() => {
      req.hasJwtToken = false;
      next();
    });
}
