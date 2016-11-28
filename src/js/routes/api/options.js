import { Router } from "express";
import models from "../../models/";

const { Option } = models;
const router = new Router();


router.get("/", (req, res) => {
  const { user } = req;

  user.getOptions()
    .then(options => {
      res.json({ options });
    })
    .catch(res.errorJSON);
});


router.put("/:key", (req, res) => {
  const { user, params: { key }, body } = req;
  const value = body.hasOwnProperty(key) ? body[key] : null;

  Option.findOne({ where: { user_id: user.id } })
    .then(entity => {
      if (!entity || value == null || !Option.tableAttributes.hasOwnProperty(key)) {
        throw new Error("Invalid parameter");
      }
      return entity;
    })
    .then(entity => entity.update({ [key]: value }))
    .then(() => {
      res.json({ [key]: value });
    })
    .catch(res.errorJSON);
});


export default router;
