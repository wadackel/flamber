import { Router } from "express";
import { updateSettings } from "../utils/drive/settings";

const router = Router();


router.post("/settings", (req, res) => {
  const { drive } = req;

  updateSettings(drive, req.body)
    .then(settings => {
      res.json({
        status: "ok",
        settings
      });
    })
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      res.json({
        status: "error",
        error
      });
    });
});


export default router;
