export default function errorJSON(req, res, next) {
  res.errorJSON = function(error, code = 0) {
    res.json({
      status: "error",
      error,
      code
    });
  };

  next();
}
