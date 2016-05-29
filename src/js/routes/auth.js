import { Router } from "express";
import * as C from "../constants/cookie";
import { verifyAuth } from "../utils/auth";

const router = Router();


router.get("/validate", (req, res) => {
  const { oauth2Client } = req;

  verifyAuth(oauth2Client, req.query.code)
    .then(({token, user}) => {
      res.json({
        status: "ok",
        token,
        user
      });
    })
    .catch(err => {
      res.json({
        status: "error",
        err
      });
    });
});


router.get("/revoke", (req, res) => {
  const token = JSON.parse(req.cookies[C.CREDS_KEY] || "");

  req.oauth2Client.revokeToken(token.access_token, err => {
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
