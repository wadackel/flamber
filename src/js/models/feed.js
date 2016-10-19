// @flow
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
      associate() {
        // Feed.
      }
    },
    instanceMethods: {
    }
  });

  return Feed;
}
