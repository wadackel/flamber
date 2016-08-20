/* eslint-disable */
import _ from "lodash";
import mongoose, { Schema } from "mongoose";
import Board from "./board";
import {
  uploadItemFile,
  updateItemThumbnail,
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
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  palette: { type: Array, default: [] },
  star: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  lastView: { type: Date, default: Date.now }
}, {
  versionKey: false
});

ItemSchema.set("toJSON", { virtuals: true });
ItemSchema.set("toObject", { virtuals: true });


// Static methods
ItemSchema.statics.appendByUserAndFile = function(drive, user, { file, boardId, palette }) {
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
    .then(entity =>
      Board.findById(entity.board).then(board => ({ entity, board }))
    )
    .then(({ entity, board }) => {
      board.items.push(entity.id);
      return board.save().then(() => entity);
    })
    .then(entity => this.populate(entity, { path: "board" }));
};


ItemSchema.statics.updateEntitiesThumbnailIfNeeded = function(drive, entities) {
  return Promise.all(entities.map(entity =>
    updateItemThumbnailIfNeeded(drive, entity)
  ));
};


ItemSchema.statics.findAllByUser = function(drive, user, query = {}) {
  const params = {
    ...query,
    user
  };

  return this.find(params)
    .then(entities => this.updateEntitiesThumbnailIfNeeded(drive, entities))
    .then(entities => Promise.all(entities.map(entity =>
      this.populate(entity, { path: "board" })
    )));
};


ItemSchema.statics.updateByUserAndIdFromObject = function(drive, user, id, newProps) {
  const fields = _.keys(this.schema.paths);

  return this.findOne({ _id: id, user })
    .then(entity => {
      const prevBoard = entity.board.toString();

      fields.forEach(key => {
        if (newProps.hasOwnProperty(key)) {
          entity[key] = newProps[key];
        }
      });

      entity.modified = new Date();

      if (newProps.hasOwnProperty("board") && prevBoard !== newProps.board) {
        return Promise.all([
          Board.removeItemByUserAndId(user, prevBoard, entity.id),
          Board.addItemByUserAndId(user, newProps.board, entity.id)
        ]).then(() => entity.save());

      } else {
        return entity.save();
      }
    })
    .then(entity => updateItemThumbnail(drive, entity))
    .then(entity => this.populate(entity, { path: "board" }));
};


ItemSchema.statics.removeByUserAndId = function(drive, user, id) {
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
    )
    .then(entity => this.populate(entity, { path: "board" }));
};


export default mongoose.model("Item", ItemSchema);
