import Setting from "../models/setting";

export default function setUpMiddleware(req, res, next) {
  const { user } = req;

  if (!user) {
    return next();
  }

  Setting.findOne({}, (err, settings) => {
    if (!err) {
      req.settings = settings;
    }

    next();
  });
}
