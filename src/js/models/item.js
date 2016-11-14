// @flow
import * as path from "path";
import * as Url from "url";
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
        Item.belongsToMany(models.Tag, {
          through: models.ItemTags,
          onDelete: "cascade",
          hooks: true
        });
      },
      filterEditableAttributes(attributes: Object) {
        const readOnly = ["id", "user_id"];
        const tableAttributes = Object.keys(Item.tableAttributes).filter(k => readOnly.indexOf(k) < 0);

        return pickBy(attributes, (value: any, key: string): boolean =>
          tableAttributes.indexOf(key) > -1
        );
      },
      createByURL(file: MulterMemoryFile, palette: string, url: string) {
        return imgur.uploadBase64(file.buffer.toString("base64"))
          .then(json => {
            if (!json.success) throw new Error("Imgur API Error");

            const { data } = json;

            return Item.create({
              file_id: data.id,
              name: Url.parse(url).hostname,
              width: data.width,
              height: data.height,
              image: data.link,
              thumbnail: makeThumbnailURL(data.link, "l"),
              size: data.size,
              type: data.type,
              url,
              palette
            });
          });
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
