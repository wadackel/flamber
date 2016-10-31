export default function errorJSON(req, res, next) {
  res.errorJSON = function(error, code = 400) {
    const msg = error instanceof Error ? error.message : error;
    console.error(msg);
    res.status(code).json({ error: msg });
  };

  next();
}
