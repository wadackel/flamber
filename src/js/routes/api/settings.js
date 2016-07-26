import _ from "lodash";
import { Router } from "express";
import Setting from "../../models/setting";

const router = Router();

function responseSettings(res, settings) {
  const result = {
    theme: settings.theme,
    boardsLayout: settings.boardsLayout
  };

  res.json({ status: "ok", settings: result });
}

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
        responseSettings(res, settings);
      }
    });
  });
});

export default router;
