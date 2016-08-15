import { Router } from "express";
import Tag from "../../models/tag";

const router = Router();


router.get("/", (req, res) => {
  Tag.findAllByUser(req.user.id)
    .then(tags => {
      res.json({ tags });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const {
    user,
    body: { name }
  } = req;

  Tag.appendByUserAndName(user.id, name)
    .then(tag => {
      res.json({ tag });
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
  const {
    user,
    body: { id }
  } = req;

  Tag.removeByUserAndId(user.id, id)
    .then(tag => {
      res.json({ tag });
    })
    .catch(res.errorJSON);
});


export default router;
