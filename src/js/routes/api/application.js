import { Router } from "express";
import User from "../../models/user";
import Setting from "../../models/setting";

const router = Router();


router.post("/", (req, res) => {
  Promise.resolve()
    .then(() => User.findById(req.user.id))
    .then(user => {
      if (!user) throw new Error("Not found user");
      return user;
    })
    .then(user => {
      const settings = new Setting({ user: user.id });
      return settings.save().then(entity => ({ user, settings: entity }));
    })
    .then(({ user, settings }) => {
      user.installed = true;
      return user.save().then(entity => ({ user: entity, settings }));
    })
    .then(data => {
      res.json(data);
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  res.json({ status: "error", error: "TODO" });
});


export default router;
