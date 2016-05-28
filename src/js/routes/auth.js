import { Router } from "express";
const router = Router();


router.get("/validate", (req, res) => {
  const { oauth2Client } = req;

  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log("Error while trying to retrieve access token", err);
      res.json({
        status: "error",
        err
      });
      return;
    }

    res.json({
      status: "ok",
      token
    });
  });
});


export default router;
