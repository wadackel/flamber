// @flow
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
    timestamps: true,
    underscored: true,
    classMethods: {
      // associate: function(models) {
      //   User.hasMany(models.Task);
      // }
      findByJwtToken(token) {
        try {
          const { id } = jwtUtils.getVerifyToken(token);
          return this.findById(id);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
  });

  return User;
}
