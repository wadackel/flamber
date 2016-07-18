import { fetchSettings } from "../utils/drive/settings";

export default function setUpMiddleware(req, res, next) {
  const { drive } = req;

  if (!drive) {
    return next();
  }

  fetchSettings(drive)
    .then(settings => {
      req.settings = settings;
      next();
    })
    .catch(() => {
      next();
    });
}
