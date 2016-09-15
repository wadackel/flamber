// import _ from "lodash";
import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
// import Board from "../../models/board";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/", (req, res) => {
  Item.findAllByUser(req.drive, req.user.id, req.query)
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.get("/:id", (req, res) => {
  Item.findByUserAndId(req.user.id, req.params.id)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.get("/image/:id", (req, res) => {
  Item.getImageBufferByUserAndId(req.drive, req.user.id, req.params.id)
    .then(buffer => {
      res.status(200).end(buffer, "binary");
    })
    .catch(res.errorJSON);
});


router.post("/file", upload.single("file"), (req, res) => {
  const { user, body, file } = req;
  const { board } = body;
  const palette = body.palette.split(",");

  Item.appendByUserAndFile(user.id, board, file, palette)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.post("/url", upload.single("file"), (req, res) => {
  const { drive, user, body, file } = req;
  const { board, url } = body;
  const palette = body.palette.split(",");
  const params = {
    file,
    url,
    board,
    palette
  };

  Item.appendByUserAndURL(drive, user.id, params)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { user, body } = req;
  const promises = body.map(item =>
    () => Item.updateByUserAndIdFromObject(user.id, item.id, item)
  );

  const sequence = promises.reduce((prev, current) => prev.then(current), promises.shift()());

  sequence
    .then(() =>
      Promise.all(body.map(item => Item.findOne({ user: user.id, _id: item.id }).populate("board")))
    )
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.put("/image", upload.single("file"), (req, res) => {
  const { drive, user, body, file } = req;

  Item.updateFileByUserAndId(drive, user.id, body.id, file)
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
