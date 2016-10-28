import { Router } from "express";
import multer from "multer";
import models from "../../models/";

const { Item } = models;
const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/:id", (req, res) => {
  Item.findByUserAndId(req.user.id, req.params.id)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.post("/file", upload.single("file"), (req, res) => {
  const { user, body: { board, palette }, file } = req;

  user.getBoards({ where: { id: board } })
    .then(boardEntities => {
      if (!boardEntities) throw new Error("Not found board");
      return boardEntities[0];
    })
    .then(boardEntity =>
      Item.createByFile(file, palette).then(entity => ({ boardEntity, entity }))
    )
    .then(({ boardEntity, entity }) =>
      boardEntity.addItem(entity).then(() => entity)
    )
    .then(entity => {
      res.json({ item: entity.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


router.post("/url", upload.single("file"), (req, res) => {
  const { user, body, file } = req;
  const { board, url } = body;
  const palette = body.palette.split(",");

  Item.appendByUserAndURL(user.id, board, file, palette, url)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { user, body } = req;

  Item.updateByUserFromArray(user.id, body)
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.put("/image", upload.single("file"), (req, res) => {
  const { user, body, file } = req;

  Item.updateImageByUserAndId(user.id, body.id, file)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body } = req;

  Promise.all(body.map(item => Item.removeByUserAndId(user.id, item.id)))
    .then(() => {
      res.json({});
    })
    .catch(res.errorJSON);
});


export default router;
