// @flow
import requestXML from "../utils/request-xml";

import type { XMLData } from "../utils/request-xml";


export default function(sequelize: any, DataTypes: any) {
  const Feed = sequelize.define("Feed", {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    favicon: DataTypes.STRING
  }, {
    tableName: "feeds",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        Feed.belongsTo(models.User);
      },
      createByURL(url: string) {
        return requestXML(url)
          .then((data: XMLData) =>
            Feed.create({
              name: data.meta.title,
              favicon: data.meta.favicon,
              url
            })
          );
      }
    },
    instanceMethods: {
    }
  });

  return Feed;
}
