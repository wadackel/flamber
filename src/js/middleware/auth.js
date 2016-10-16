import * as cookie from "../utils/cookie";
import models from "../models/";

const { User } = models;

export default function authMiddleware(req, res, next) {
  const token = cookie.loadToken();

  User.findByJwtToken(token)
    .then(user => {
      req.preUser = user;
      req.hasJwtToken = !!user;
      next();
    })
    .catch(() => {
      req.preUser = null;
      req.hasJwtToken = false;
      next();
    });
}
