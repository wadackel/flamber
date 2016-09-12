import queryString from "query-string";
import { Router } from "express";
import jwt from "jwt-simple";
import passport from "passport";
import * as AuthProviders from "../constants/auth-providers";

const router = Router();
const { JWT_SECRET } = process.env;


router.get("/authenticate/:provider", (req, res) => {
  let url = null;

  switch (req.query.provider) {
    case AuthProviders.GOOGLE:
      url = "/auth/google";
      break;
  }

  if (url == null) {
    res.status(500).send("Error: Not found provider");

  } else {
    res.redirect(302, url);
  }
});


// Google
router.get("/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile"]
  })
);

router.get("/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/callback?s=failure"
  }),
  (req, res) => {
    const { user: { id, providerId } } = req;
    const jwtToken = jwt.encode({ id, providerId }, JWT_SECRET);
    const qs = queryString.stringify({ s: "success", t: jwtToken });
    res.redirect(302, `/auth/callback?${qs}`);
  }
);


// Popup routing
router.get("/callback", (req, res) => {
  res.send("");
});


export default router;
