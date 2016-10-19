import { Router } from "express";
// import Feed from "../../models/feed";

const router = new Router();


router.get("/", (req, res) => {
  res.json({ test: "key" });
});


export default router;
