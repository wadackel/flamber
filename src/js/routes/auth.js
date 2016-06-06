import { Router } from "express";
import * as C from "../constants/cookie";
import verifyAuth, { refreshAccessToken } from "../utils/verify-auth";

const router = Router();


router.get("/validate", (req, res) => {
  const { oauth2Client } = req;

  verifyAuth(oauth2Client, req.query.code)
    .then(({ token, user }) => {
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
  const { oauth2Client, cookies } = req;
  const configObj = JSON.parse(cookies[C.CONFIG_KEY] || "{}");

  function errorResponse(err) {
    console.log(err);
    res.json({
      status: "error",
      err
    });
  }

  refreshAccessToken(oauth2Client, configObj.expiry_date)
    .then(token => {
      oauth2Client.revokeToken(token.access_token, err => {
        if (err) {
          return errorResponse(err);
        }

        res.json({ status: "ok" });
      });
    })
    .catch(err => errorResponse(err));
});


export default router;
