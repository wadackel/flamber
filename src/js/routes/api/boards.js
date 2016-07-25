import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "error", error: "TODO" });
});

export default router;

