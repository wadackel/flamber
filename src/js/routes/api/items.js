/* eslint-disable */
import _ from "lodash";
import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
import Board from "../../models/board";
import {
  uploadItemFile,
  updateItemThumbnail,
  updateItemsThumbnailIfNeeded,
  deleteItemFile
} from "../../utils/drive/items";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/", (req, res) => {
  Item.findAll(req.drive)
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.post("/file", upload.single("file"), (req, res) => {
  const { drive, body, file } = req;
  const { boardId } = body;
  const palette = body.palette.split(",");
  const params = {
    file,
    boardId,
    palette
  };

  Item.appendByFile(drive, params)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(item => Item.removeById(drive, item.id)))
    .then(() => {
      res.json({});
    })
    .catch(res.errorJSON);
});


export default router;
