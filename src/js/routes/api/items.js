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

function findOldestItem(boardId) {
  return Item.findOne({ boardId })
    .sort({ created: -1 });
}

function updateBoardFirstItemIfNeeded(items) {
  return Promise.all(items.map(item => {
    let board = null;

    return Board.findOne({ firstItem: item._id })
      .then(res => {
        board = res;
        return !board ? null : findOldestItem(board._id);
      })
      .then(res => {
        if (res) {
          board.firstItem = res._id;
        }
        return !res ? Promise.resolve(board) : board.save();
      })
      .then(() => item);
  }));
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
      res.json({ items });
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
    .then(item =>
      Board.findById(item.boardId).then(board => ({ item, board }))
    )
    .then(({ item, board }) => {
      if (!board.firstItem) {
        board.firstItem = item._id;
      }

      return board.save().then(savedBoard => ({ item, board: savedBoard }));
    })
    .then(({ item }) => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(item => updateItem(drive, item)))
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(item => deleteItem(drive, item)))
    .then(updateBoardFirstItemIfNeeded)
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


export default router;
