import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
import {
  uploadItemFile,
  updateItemsThumbnailIfNeeded,
  deleteItemFile
} from "../../utils/drive/items";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.errorJSON("TODO");
});

router.get("/board/:boardId", (req, res) => {
  const { drive, params } = req;
  const { boardId } = params;

  Item.find({ boardId })
    .then(items => updateItemsThumbnailIfNeeded(drive, items))
    .then(items => {
      res.json({
        status: "ok",
        items
      });
    })
    .catch(res.errorJSON);
});

router.post("/", upload.single("file"), (req, res) => {
  const { drive, body, file } = req;

  uploadItemFile(drive, file)
    .then(result => {
      const item = new Item({
        fileId: result.id,
        boardId: body.boardId,
        name: file.originalname,
        width: result.imageMediaMetadata.width,
        height: result.imageMediaMetadata.height,
        thumbnail: result.thumbnailLink,
        palette: body.palette.split(",")
      });

      return item.save();
    })
    .then(item => {
      res.json({
        status: "ok",
        item
      });
    })
    .catch(res.errorJSON);
});

router.delete("/", (req, res) => {
  const { drive, body } = req;
  let deleteItem = null;

  Item.findById(body._id)
    .then(item => {
      deleteItem = item;

      return deleteItemFile(drive, deleteItem.fileId);
    })
    .then(() => deleteItem.remove())
    .then(() => {
      res.json({
        status: "ok",
        item: deleteItem
      });
    })
    .catch(res.errorJSON);
});

export default router;
