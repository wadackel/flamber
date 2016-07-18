import { Router } from "express";
import { fetchSettings, updateSettings } from "../utils/drive/settings";

const router = Router();


function errorResponse(res, error) {
  console.log(error); // eslint-disable-line no-console
  res.json({
    status: "error",
    error
  });
}

router.get("/settings", (req, res) => {
  const { drive } = req;

  fetchSettings(drive)
    .then(settings => {
      res.json({
        status: "ok",
        settings
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});

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
      errorResponse(res, error);
    });
});


export default router;
