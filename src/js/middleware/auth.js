import * as cookie from "../utils/cookie";
import User from "../models/user";

export default function authMiddleware(req, res, next) {
  const token = cookie.loadToken();

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
