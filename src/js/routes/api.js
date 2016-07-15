import { Router } from "express";

const router = Router();


router.post("/settings", (req, res) => {
  // TODO: Implement the registration to Google Drive.
  res.json({
    status: "ok",
    settings: req.body
  });
});


export default router;
