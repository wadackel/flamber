import path from "path";
// import Url from "url";
// import _ from "lodash";
import imgur from "imgur";
import mongoose, { Schema } from "mongoose";
import Board from "./board";
import { makeThumbnailURL } from "../utils/imgur";

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  file: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board" },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  url: String,
  type: String,
  size: Number,
  image: String,
  width: Number,
  height: Number,
  thumbnail: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  palette: { type: Array, default: [] },
  star: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  lastView: { type: Date, default: Date.now }
}, {
  versionKey: false
});

ItemSchema.set("toJSON", { virtuals: true });
ItemSchema.set("toObject", { virtuals: true });


// TODO: Refactor
// Static methods
ItemSchema.statics.appendByUserAndFile = function(user, board, file, palette) {
  const base64 = file.buffer.toString("base64");

  return imgur.uploadBase64(base64)
    .then(json => {
      const { data } = json;
      const entity = new this({
        user,
        board,
        palette,
        url: file.originalname,
        name: path.parse(file.originalname).name,
        file: data.id,
        width: data.width,
        height: data.height,
        image: data.link,
        thumbnail: makeThumbnailURL(data.link, "l"),
        size: data.size,
        type: data.type
      });

      return entity.save();
    })
    .then(entity =>
      Board.findById(entity.board).then(boardEntity => ({ entity, boardEntity }))
    )
    .then(({ entity, boardEntity }) => {
      boardEntity.items.push(entity.id);
      return boardEntity.save(() => entity);
    })
    .then(entity => this.populate(entity, [
      { path: "board" },
      { path: "tags" }
    ]));
};
//
//
// ItemSchema.statics.appendByUserAndURL = function(drive, user, { file, url, board, palette }) {
//   return uploadItemFile(drive, file)
//     .then(res => {
//       const { id, thumbnailLink, imageMediaMetadata } = res;
//       const { width, height } = imageMediaMetadata;
//       const item = new this({
//         fileId: id,
//         name: Url.parse(url).hostname,
//         thumbnail: thumbnailLink,
//         user,
//         url,
//         board,
//         width,
//         height,
//         palette
//       });
//
//       return item.save();
//     })
//     .then(entity =>
//       Board.findById(entity.board).then(boardEntity => ({ entity, boardEntity }))
//     )
//     .then(({ entity, boardEntity }) => {
//       boardEntity.items.push(entity.id);
//       return boardEntity.save().then(() => entity);
//     })
//     .then(entity => this.populate(entity, [
//       { path: "board" },
//       { path: "tags" }
//     ]));
// };
//
//
// ItemSchema.statics.updateFileByUserAndId = function(drive, user, id, file) {
//   return this.findByUserAndId(user, id)
//     .then(entity =>
//       updateItemFile(drive, entity.fileId, file).then(res => ({ entity, res }))
//     )
//     .then(({ entity, res }) => {
//       const { thumbnailLink, imageMediaMetadata } = res;
//       const { width, height } = imageMediaMetadata;
//
//       entity.width = width;
//       entity.height = height;
//       entity.thumbnail = thumbnailLink;
//
//       return entity.save();
//     });
// };
//
//
// ItemSchema.statics.updateEntitiesThumbnailIfNeeded = function(drive, entities) {
//   return Promise.all(entities.map(entity =>
//     updateItemThumbnailIfNeeded(drive, entity)
//   ));
// };
//
//
// ItemSchema.statics.findAllByUser = function(drive, user, query = {}) {
//   const params = {
//     ...query,
//     user
//   };
//
//   return this.find(params)
//     .then(entities => this.updateEntitiesThumbnailIfNeeded(drive, entities))
//     .then(entities => Promise.all(entities.map(entity =>
//       this.populate(entity, [
//         { path: "board" },
//         { path: "tags" }
//       ])
//     )));
// };
//
//
// ItemSchema.statics.findByUserAndId = function(user, id) {
//   return this.findOne({ user, _id: id })
//     .populate("board tags");
// }
//
//
// ItemSchema.statics.updateByUserAndIdFromObject = function(drive, user, id, newProps) {
//   const fields = _.keys(this.schema.paths);
//
//   return this.findOne({ _id: id, user })
//     .then(entity => {
//       const prevBoard = entity.board.toString();
//
//       fields.forEach(key => {
//         if (newProps.hasOwnProperty(key)) {
//           entity[key] = newProps[key];
//         }
//       });
//
//       entity.modified = new Date();
//
//       if (newProps.hasOwnProperty("board") && prevBoard !== newProps.board) {
//         return Promise.all([
//           Board.removeItemByUserAndId(user, prevBoard, entity.id),
//           Board.addItemByUserAndId(user, newProps.board, entity.id)
//         ]).then(() => entity.save());
//
//       } else {
//         return entity.save();
//       }
//     })
//     .then(entity => updateItemThumbnail(drive, entity))
//     .then(entity => this.populate(entity, [
//       { path: "board" },
//       { path: "tags" }
//     ]));
// };
//
//
// ItemSchema.statics.removeByUserAndId = function(drive, user, id) {
//   return this.findOne({ _id: id, user })
//     .then(entity =>
//       deleteItemFile(drive, entity.fileId).then(() => entity)
//     )
//     .then(entity =>
//       this.findByIdAndRemove(entity.id).then(() => entity)
//     )
//     .then(entity =>
//       Board.findById(entity.board)
//         .then(board => {
//           board.items = board.items.filter(id => id.toString() !== entity.id);
//           return board.save();
//         })
//         .then(() => entity)
//     )
//     .then(entity => this.populate(entity, [
//       { path: "board" },
//       { path: "tags" }
//     ]));
// };
//
//
// ItemSchema.statics.getImageBufferByUserAndId = function(drive, user, id) {
//   return new Promise((resolve, reject) => {
//     this.findByUserAndId(user, id)
//       .then(item => {
//         const { fileId } = item;
//         const chunks = [];
//
//         drive.files.get({ fileId, alt: "media" })
//           .on("error", reject)
//           .on("data", data => chunks.push(new Buffer(data)))
//           .on("end", () => {
//             const buffer = Buffer.concat(chunks);
//             resolve(buffer);
//           });
//       });
//   });
// };


export default mongoose.model("Item", ItemSchema);
