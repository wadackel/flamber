/* eslint-disable */
import mongoose, { Schema } from "mongoose";
import Board from "./board";
import {
  uploadItemFile,
  updateItemThumbnailIfNeeded,
  deleteItemFile
} from "../utils/drive/items";

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  fileId: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board" },
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
ItemSchema.statics.appendByFile = function(drive, user, { file, boardId, palette }) {
  return uploadItemFile(drive, file)
    .then(res => {
      const { width, height } = res.imageMediaMetadata;
      const item = new this({
        board: boardId,
        fileId: res.id,
        name: file.originalname,
        thumbnail: res.thumbnailLink,
        user,
        width,
        height,
        palette
      });

      return item.save();
    })
    .then(item =>
      Board.findById(item.board).then(board => ({ item, board }))
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

ItemSchema.statics.findAll = function(drive, user, query = {}) {
  const params = {
    ...query,
    user
  };

  return this.find(params)
    .then(entities => this.updateEntitiesThumbnailIfNeeded(drive, entities));
};

ItemSchema.statics.removeById = function(drive, user, id) {
  return this.findOne({ _id: id, user })
    .then(entity =>
      deleteItemFile(drive, entity.fileId).then(() => entity)
    )
    .then(entity =>
      this.findByIdAndRemove(entity.id).then(() => entity)
    )
    .then(entity =>
      Board.findById(entity.board)
        .then(board => {
          board.items = board.items.filter(id => id.toString() !== entity.id);
          return board.save();
        })
        .then(() => entity)
    );
};


export default mongoose.model("Item", ItemSchema);
