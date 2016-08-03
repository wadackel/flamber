/* eslint-disable */
import mongoose, { Schema } from "mongoose";
import Board from "./board";
import {
  uploadItemFile,
  updateItemThumbnailIfNeeded
} from "../utils/drive/items";

const ItemSchema = new Schema({
  fileId: { type: String, required: true },
  boardId: { type: Schema.Types.ObjectId, ref: "Board" },
  name: { type: String, required: true },
  url: { type: String, default: "" },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  thumbnail: { type: String, default: "" },
  tags: { type: Array, default: [] },
  palette: { type: Array, default: [] },
  favorite: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

ItemSchema.set("toJSON", { virtuals: true });
ItemSchema.set("toObject", { virtuals: true });


// Static methods
ItemSchema.statics.appendByFile = function(drive, { file, boardId, palette }) {
  return uploadItemFile(drive, file)
    .then(res => {
      const { width, height } = res.imageMediaMetadata;
      const item = new this({
        fileId: res.id,
        name: file.originalname,
        thumbnail: res.thumbnailLink,
        width,
        height,
        boardId,
        palette
      });

      return item.save();
    })
    .then(item =>
      Board.findById(item.boardId).then(board => ({ item, board }))
    )
    .then(({ item, board }) => {
      board.items.push(item.id);
      return board.save().then(() => item);
    });
};


// Instance methods
ItemSchema.methods.updateThumbnailIfNeeded = function(drive) {
  return updateItemThumbnailIfNeeded(drive, this);
};


export default mongoose.model("Item", ItemSchema);
