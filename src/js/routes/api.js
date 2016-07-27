import { Router } from "express";
import application from "./api/application";
import boards from "./api/boards";
import items from "./api/items";
import settings from "./api/settings";

const router = Router();

router.use((req, res, next) => {
  // TODO: Check auth user
  next();
});

router.use("/application", application);
router.use("/boards", boards);
router.use("/items", items);
router.use("/settings", settings);

export default router;
