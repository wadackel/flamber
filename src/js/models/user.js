// @flow
import imgur from "imgur";
import { makeThumbnailURL } from "../utils/imgur";
import * as jwtUtils from "../utils/jwt";

export default function(sequelize: any, DataTypes: any) {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    provider: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    today_upload: DataTypes.INTEGER,
    installed: DataTypes.INTEGER
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        User.hasOne(models.Option);
      },
      findByJwtToken(token) {
        try {
          const { id } = jwtUtils.getVerifyToken(token);
          return this.findById(id);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
    instanceMethods: {
      updatePhoto(photo: MulterMemoryFile) {
        return imgur.uploadBase64(photo.buffer.toString("base64"))
          .then((json: ImgurResponse) => {
            const { data } = json;
            const thumbnail = makeThumbnailURL(data.link, "b"); // big square

            return this.update({
              photo: thumbnail
            });
          });
      }
    }
  });

  return User;
}
