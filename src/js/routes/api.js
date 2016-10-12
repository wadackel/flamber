import { Router } from "express";
import models from "../models/";
import application from "./api/application";
import boards from "./api/boards";
import items from "./api/items";
import settings from "./api/settings";
import profile from "./api/profile";
import screenshot from "./api/screenshot";
import tags from "./api/tags";

const router = new Router();
const { User } = models;

router.use((req, res, next) => {
  const { authorization } = req.headers;
  const token = (authorization || "").replace("Bearer ", "");

  User.findByJwtToken(token)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.errorJSON("Not found user", 401);
      }
    })
    .catch(() => {
      res.errorJSON("Unauthorixed", 401);
    });
});

router.use("/application", application);
router.use("/boards", boards);
router.use("/items", items);
router.use("/settings", settings);
router.use("/profile", profile);
router.use("/screenshot", screenshot);
router.use("/tags", tags);

export default router;
