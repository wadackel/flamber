import { Router } from "express";
import * as C from "../constants/cookie";

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


router.get("/revoke", (req, res) => {
  const { oauth2Client } = req;
  const token = JSON.parse(req.cookies[C.CREDS_KEY] || "");

  oauth2Client.revokeToken(token.access_token, err => {
    if (err) {
      console.log(err);
      res.json({
        status: "error",
        err
      });
      return;
    }

    res.json({ status: "ok" });
  });
});


export default router;
