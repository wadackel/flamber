export default function errorJSON(req, res, next) {
  res.errorJSON = function(error, code = 400) {
    res.status(code).json({ error });
  };

  next();
}
