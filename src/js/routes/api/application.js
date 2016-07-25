import { Router } from "express";

const router = Router();

router.delete("/", (req, res) => {
  res.json({ status: "error", error: "TODO" });
});

export default router;
