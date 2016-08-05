import _ from "lodash";
import { Router } from "express";
import Setting from "../../models/setting";

const router = Router();


router.get("/", (req, res) => {
  res.errorJSON("TODO");
});


router.put("/", (req, res) => {
  Setting.findOne({ user: req.user.id })
    .then(settings => {
      const fields = _.keys(Setting.schema.paths);

      fields.forEach(key => {
        if (req.body.hasOwnProperty(key)) {
          settings[key] = req.body[key];
        }
      });

      return settings.save();
    })
    .then(settings => {
      res.json({ settings });
    })
    .catch(res.errorJSON);
});


export default router;
