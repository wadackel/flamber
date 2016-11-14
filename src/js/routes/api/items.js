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
      if (boardEntities.length === 0) throw new Error("Not found board");
      return Promise.resolve();
    })
    .then(() => Item.createByFile(file, palette))
    .then(entity => entity.update({ user_id: user.id, board_id: board }))
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.post("/url", upload.single("file"), (req, res) => {
  const { user, body: { board, url, palette }, file } = req;

  user.getBoards({ where: { id: board } })
    .then(boardEntities => {
      if (boardEntities.length === 0) throw new Error("Not found board");
      return Promise.resolve();
    })
    .then(() => Item.createByURL(file, palette, url))
    .then(entity => entity.update({ user_id: user.id, board_id: board }))
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { user, body } = req;

  Promise.all(body.map(attributes =>
    Item.find({ where: { id: attributes.id, user_id: user.id } })
      .then(item => {
        if (!item) throw new Error("Not found item");
        return item.updateFromAttributes(attributes);
      })
      .then(item => item.includeAll())
  ))
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.put("/image", upload.single("file"), (req, res) => {
  const { user, body, file } = req;

  user.getItems({ where: { id: body.id } })
    .then(items => {
      if (!items || items.length === 0) throw new Error("Not found item");
      return items[0];
    })
    .then(item => item.updateImage(file))
    .then(item => item.includeAll())
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body } = req;

  user.getItems({ where: { id: body.map(entity => entity.id) } })
    .then(items => {
      if (items.length !== body.length) throw new Error("Invalida parameter");
      return items;
    })
    .then(items => user.removeItems(items).then(() => items))
    .then(items => Promise.all(items.map(item => item.destroy())).then(() => items))
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


export default router;
