import models from "../models/";

const { Option } = models;

export default function setupDataMiddleware(req, res, next) {
  const { preUser } = req;

  if (!preUser) {
    req.options = null;
    return next();
  }

  Option.findOne({ where: { user_id: preUser.id } })
    .then(entity => {
      req.options = entity;
      next();
    })
    .catch(() => {
      req.options = null;
      next();
    });
}
