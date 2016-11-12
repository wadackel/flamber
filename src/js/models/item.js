// @flow
import * as path from "path";
import { pickBy } from "lodash";
import Sequelize from "sequelize";
import imgur from "imgur";
import { makeThumbnailURL } from "../utils/imgur";

import type { MulterMemoryFile } from "../types/multer";


export default function(sequelize: any, DataTypes: any) {
  const Item = sequelize.define("Item", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    file_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: { type: DataTypes.STRING, defaultValue: "" },
    url: { type: DataTypes.STRING, defaultValue: "" },
    size: DataTypes.INTEGER,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    palette: { type: DataTypes.STRING, defaultValue: "" },
    star: { type: DataTypes.BOOLEAN, defaultValue: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    viewed_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
  }, {
    tableName: "items",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        Item.belongsTo(models.User);
        Item.belongsTo(models.Board);
        Item.belongsToMany(models.Tag, { through: models.ItemTags });
      },
      filterEditableAttributes(attributes: Object) {
        const readOnly = ["id", "user_id"];
        const tableAttributes = Object.keys(Item.tableAttributes).filter(k => readOnly.indexOf(k) < 0);

        return pickBy(attributes, (value: any, key: string): boolean =>
          tableAttributes.indexOf(key) > -1
        );
      },
      createByFile(file: MulterMemoryFile, palette: string) {
        return imgur.uploadBase64(file.buffer.toString("base64"))
          .then(json => {
            if (!json.success) throw new Error("Imgur API Error");

            const { data } = json;

            return Item.create({
              file_id: data.id,
              name: path.parse(file.originalname).name,
              url: file.originalname,
              width: data.width,
              height: data.height,
              image: data.link,
              thumbnail: makeThumbnailURL(data.link, "l"),
              size: data.size,
              type: data.type,
              palette
            });
          });
      }
    },
    instanceMethods: {
      includeAll() {
        const { models } = this.sequelize;

        return Item.find({
          where: { id: this.id },
          include: [models.Tag]
        });
      },
      updateFromAttributes(attributes: Object) {
        const validAttributes = Item.filterEditableAttributes(attributes);

        return this.update(validAttributes)
          .then(entity =>
            attributes.hasOwnProperty("Tags")
              ? entity.setTags(attributes.Tags).then(() => entity)
              : entity
          );
      },
      updateImage(file: MulterMemoryFile) {
        return imgur.uploadBase64(file.buffer.toString("base64"))
          .then(json => {
            if (!json.success) throw new Error("Imgur API Error");

            const { data } = json;

            return this.update({
              file_id: data.id,
              width: data.width,
              height: data.height,
              image: data.link,
              thumbnail: makeThumbnailURL(data.link, "l"),
              size: data.size,
              type: data.type
            });
          });
      }
    }
  });

  Item.hook("beforeValidate", item => {
    if (Array.isArray(item.palette)) {
      item.palette = item.palette.join(",");
    }
  });

  return Item;
}
// import path from "path";
// import Url from "url";
// import _ from "lodash";
// import imgur from "imgur";
// import Board from "./board";
// import { makeThumbnailURL } from "../utils/imgur";
//
// ItemSchema.statics.appendByUserAndFile = function(user, board, file, palette) {
//   const base64 = file.buffer.toString("base64");
//
//   return imgur.uploadBase64(base64)
//     .then(json => {
//       const { data } = json;
//       const entity = new this({
//         user,
//         board,
//         palette,
//         url: file.originalname,
//         name: path.parse(file.originalname).name,
//         file: data.id,
//         width: data.width,
//         height: data.height,
//         image: data.link,
//         thumbnail: makeThumbnailURL(data.link, "l"),
//         size: data.size,
//         type: data.type
//       });
//
//       return entity.save();
//     })
//     .then(entity => this.populateEntity(entity));
// };
//
//
// ItemSchema.statics.appendByUserAndURL = function(user, board, file, palette, url) {
//   const base64 = file.buffer.toString("base64");
//
//   return imgur.uploadBase64(base64)
//     .then(json => {
//       const { data } = json;
//       const entity = new this({
//         user,
//         board,
//         palette,
//         url,
//         name: Url.parse(url).hostname,
//         file: data.id,
//         width: data.width,
//         height: data.height,
//         image: data.link,
//         thumbnail: makeThumbnailURL(data.link, "l"),
//         size: data.size,
//         type: data.type
//       });
//
//       return entity.save();
//     })
//     .then(entity => this.populateEntity(entity));
// };
//
//
// ItemSchema.statics.updateImageByUserAndId = function(user, id, file) {
//   const base64 = file.buffer.toString("base64");
//
//   return this.findByUserAndId(user, id)
//     .then(entity =>
//       imgur.uploadBase64(base64).then(json => ({ json, entity }))
//     )
//     .then(({ json, entity }) => {
//       const { data } = json;
//       entity.file = data.id;
//       entity.image = data.link;
//       entity.thumbnail = makeThumbnailURL(data.link, "l");
//       entity.width = data.width;
//       entity.height = data.height;
//       entity.size = data.size;
//       entity.type = data.type;
//       return entity.save();
//     })
//     .then(entity => this.populateEntity(entity));
//
//
// ItemSchema.statics.updateByUserFromArray = function(user, entities) {
//   const promises = entities.map(entity =>
//     () => this.updateByUserAndIdFromObject(user, entity.id, entity)
//   );
//
//   const sequence = promises.reduce((prev, current) =>
//     prev.then(current),
//     promises.shift()()
//   );
//
//   return sequence.then(() =>
//     Promise.all(entities.map(entity => this.findOne({ user, _id: entity.id }).populate("board tags")))
//   );
// };
