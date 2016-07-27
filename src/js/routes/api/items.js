import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
import { uploadItemFile } from "../../utils/drive/items";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.errorJSON("TODO");
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
        palette: body.palette
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

export default router;
