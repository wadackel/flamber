import Setting from "../models/setting";

export default function setUpMiddleware(req, res, next) {
  const { user } = req;

  if (!user) {
    return next();
  }

  Setting.findOne({ user: user.id })
    .then(entity => {
      if (entity) return Promise.resolve(entity);

      const settings = new Setting();
      settings.user = user.id;
      return settings.save();
    })
    .then(entity => {
      req.settings = entity;
      next();
    })
    .catch(() => next());
}
