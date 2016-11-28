import { Router } from "express";

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

  user.getOptions({ where: { user_id: user.id, name: key } })
    .then(entities => {
      if (entities.length === 0) throw new Error("Invalid parameter");
      return entities[0].update({ value });
    })
    .then(() => {
      res.json({ [key]: value });
    })
    .catch(res.errorJSON);
});


export default router;
