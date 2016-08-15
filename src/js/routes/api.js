import { Router } from "express";
import application from "./api/application";
import boards from "./api/boards";
import items from "./api/items";
import settings from "./api/settings";
import tags from "./api/tags";

const router = Router();

router.use((req, res, next) => {
  if (req.authenticated) {
    next();
  } else {
    res.errorJSON("Unauthorixed", 401);
  }
});

router.use("/application", application);
router.use("/boards", boards);
router.use("/items", items);
router.use("/settings", settings);
router.use("/tags", tags);

export default router;
