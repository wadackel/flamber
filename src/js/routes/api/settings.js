import _ from "lodash";
import { Router } from "express";
import Setting from "../../models/setting";

const router = Router();

Setting.findOne({}, (error, result) => {
  if (result == null) {
    const setting = new Setting();
    setting.save();
  }
});

router.get("/", (req, res) => {
  res.errorJSON("TODO");
});

router.put("/", (req, res) => {
  Setting.findOne({}, (error, settings) => {
    _.forEach(req.body, (value, key) => {
      settings[key] = value;
    });

    settings.save(err => {
      if (err) {
        res.errorJSON(err);

      } else {
        res.status({
          status: "ok",
          settings
        });
      }
    });
  });
});

export default router;
