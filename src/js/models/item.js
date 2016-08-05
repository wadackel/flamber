/* eslint-disable */
import mongoose, { Schema } from "mongoose";
import Board from "./board";
import {
  uploadItemFile,
  updateItemThumbnailIfNeeded,
  deleteItemFile
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

ItemSchema.statics.updateEntitiesThumbnailIfNeeded = function(drive, entities) {
  return Promise.all(entities.map(entity =>
    updateItemThumbnailIfNeeded(drive, entity)
  ));
};

ItemSchema.statics.findAll = function(drive, query = {}) {
  return this.find(query)
    .then(entities => this.updateEntitiesThumbnailIfNeeded(drive, entities));
};

ItemSchema.statics.removeById = function(drive, id) {
  return this.findById(id)
    .then(entity =>
      deleteItemFile(drive, entity.fileId).then(() => entity)
    )
    .then(entity => this.findByIdAndRemove(entity.id));
};


export default mongoose.model("Item", ItemSchema);
