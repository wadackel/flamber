import { Router } from "express";
import models from "../../models/";

const { Option } = models;
const router = new Router();


router.put("/theme", (req, res) => {
  const { user, body: { theme } } = req;

  Option.findOne({ where: { user_id: user.id } })
    .then(entity => entity.update({ theme }))
    .then(entity => {
      res.json({ theme: entity.theme });
    })
    .catch(res.errorJSON);
});


export default router;
