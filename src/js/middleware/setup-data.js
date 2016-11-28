import normalizeOptions from "../utils/normalize-options";

export default function setupDataMiddleware(req, res, next) {
  const { preUser } = req;

  if (!preUser) {
    req.options = null;
    return next();
  }

  preUser.getOptions()
    .then(options => {
      req.options = normalizeOptions({ options: options.map(o => o.get({ plain: true })) });
      next();
    })
    .catch(() => {
      req.options = null;
      next();
    });
}
