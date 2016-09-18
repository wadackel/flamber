import { Router } from "express";
import Setting from "../../models/setting";

const router = Router();


router.get("/", (req, res) => {
  Setting.findByUser(req.user.id)
    .then(settings => {
      res.json(settings);
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  Setting.updateByUser(req.user.id, req.body)
    .then(settings => {
      res.json(settings);
    })
    .catch(res.errorJSON);
});


export default router;
