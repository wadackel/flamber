import { Router } from "express";
import models from "../../models/";

const { Tag } = models;
const router = new Router();


router.get("/", (req, res) => {
  req.user.getTags()
    .then(tags => {
      res.json({ tags: tags.map(entity => entity.get({ plain: true })) });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const { user, body: { name } } = req;

  user.getTags({ where: { name }, attributes: ["id"] })
    .then(ids => {
      if (ids.length > 0) throw new Error(`"${name}" is already exists`);
      return Promise.resolve();
    })
    .then(() => Tag.create({ name }))
    .then(tag => user.addTag(tag).then(() => tag))
    .then(tag => {
      res.json({ tag: tag.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { user, body } = req;

  Tag.updateByUserAndIdFromObject(user.id, body.id, body)
    .then(tag => {
      res.json({ tag });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body: { id } } = req;

  Tag.removeByUserAndId(user.id, id)
    .then(tag => {
      res.json({ tag });
    })
    .catch(res.errorJSON);
});


export default router;
