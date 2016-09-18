import path from "path";
import Url from "url";
import _ from "lodash";
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
ItemSchema.statics.populateEntity = function(entity) {
  return this.populate(entity, [
    { path: "board" },
    { path: "tags" }
  ]);
};

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
    .then(entity => this.populateEntity(entity));
};


ItemSchema.statics.appendByUserAndURL = function(user, board, file, palette, url) {
  const base64 = file.buffer.toString("base64");

  return imgur.uploadBase64(base64)
    .then(json => {
      const { data } = json;
      const entity = new this({
        user,
        board,
        palette,
        url,
        name: Url.parse(url).hostname,
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
    .then(entity => this.populateEntity(entity));
};


ItemSchema.statics.updateImageByUserAndId = function(user, id, file) {
  const base64 = file.buffer.toString("base64");

  return this.findByUserAndId(user, id)
    .then(entity =>
      imgur.uploadBase64(base64).then(json => ({ json, entity }))
    )
    .then(({ json, entity }) => {
      const { data } = json;
      entity.file = data.id;
      entity.image = data.link;
      entity.thumbnail = makeThumbnailURL(data.link, "l");
      entity.width = data.width;
      entity.height = data.height;
      entity.size = data.size;
      entity.type = data.type;
      return entity.save();
    })
    .then(entity => this.populateEntity(entity));
};
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
ItemSchema.statics.findByUserAndId = function(user, id) {
  return this.findOne({ user, _id: id })
    .populate("board tags");
};


ItemSchema.statics.updateByUserAndIdFromObject = function(user, id, newProps) {
  const fields = _.keys(this.schema.paths);

  return this.findOne({ _id: id, user })
    .then(entity => {
      fields.forEach(key => {
        if (newProps.hasOwnProperty(key)) {
          entity[key] = newProps[key];
        }
      });

      entity.modified = new Date();

      return entity.save();
    })
    .then(entity => this.populateEntity(entity));
};


ItemSchema.statics.updateByUserFromArray = function(user, entities) {
  const promises = entities.map(entity =>
    () => this.updateByUserAndIdFromObject(user, entity.id, entity)
  );

  const sequence = promises.reduce((prev, current) =>
    prev.then(current),
    promises.shift()()
  );

  return sequence.then(() =>
    Promise.all(entities.map(entity => this.findOne({ user, _id: entity.id }).populate("board tags")))
  );
};


ItemSchema.statics.removeByUserAndId = function(user, id) {
  return this.findOne({ _id: id, user })
    .then(entity => entity.remove().then(() => entity))
    .then(entity => this.populateEntity(entity));
};


// Middleware
ItemSchema.post("init", entity => {
  entity._original = entity.toObject();
});

ItemSchema.post("save", (entity, next) => {
  // Create
  if (_.isUndefined(entity._original)) {
    Board.findById(entity.board)
      .then(board => {
        board.items.push(entity.id);
        board.save(next);
      })
      .catch(next);

  // Update
  } else {
    const prevProps = { ...entity._original };
    const nextProps = entity.toObject();
    entity._original = nextProps;

    if (prevProps.board.toString() === nextProps.board.toString()) {
      next();
    }

    Promise.all([
      Board.removeItemByUserAndId(entity.user, prevProps.board.toString(), entity.id),
      Board.addItemByUserAndId(entity.user, nextProps.board.toString(), entity.id)
    ])
      .then(() => {
        next();
      })
      .catch(() => {
        next();
      });
  }
});

ItemSchema.post("remove", (entity, next) => {
  Board.findById(entity.board)
    .then(board => {
      board.items = board.items.filter(id => id.toString() !== entity.id);
      board.save(next);
    })
    .catch(next);
});


export default mongoose.model("Item", ItemSchema);
