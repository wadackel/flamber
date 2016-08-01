import _ from "lodash";
import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
import {
  uploadItemFile,
  updateItemThumbnail,
  updateItemsThumbnailIfNeeded,
  deleteItemFile
} from "../../utils/drive/items";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

function updateItem(drive, newItem) {
  return Item.findById(newItem._id)
    .then(item => updateItemThumbnail(drive, item))
    .then(item => {
      const whiteList = [
        "boardId",
        "name",
        "tags",
        "palette",
        "favorite"
      ];

      _.forEach(newItem, (value, key) => {
        if (whiteList.indexOf(key) > -1) {
          item[key] = value;
        }
      });

      item.modified = new Date();

      return item.save();
    });
}

function deleteItem(drive, targetItem) {
  let tmpItem = null;

  return Item.findById(targetItem._id)
    .then(item => {
      tmpItem = item;

      return deleteItemFile(drive, tmpItem.fileId);
    })
    .then(() => tmpItem.remove())
    .then(() => Promise.resolve(tmpItem));
}


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

router.put("/", (req, res) => {
  const { drive, body } = req;

  updateItem(drive, body)
    .then(item => {
      res.json({
        status: "ok",
        item
      });
    })
    .catch(res.errorJSON);
});

router.put("/multiple", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(item => updateItem(drive, item)))
    .then(items => {
      res.json({
        status: "ok",
        items
      });
    })
    .catch(res.errorJSON);
});

router.delete("/", (req, res) => {
  const { drive, body } = req;

  deleteItem(drive, body)
    .then(item => {
      res.json({
        status: "ok",
        item
      });
    })
    .catch(res.errorJSON);
});

router.delete("/multiple", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(item => deleteItem(drive, item)))
    .then(items => {
      res.json({
        stauts: "ok",
        items
      });
    })
    .catch(res.errorJSON);
});

export default router;
