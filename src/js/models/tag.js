// @flow
export default function(sequelize: any, DataTypes: any) {
  const Tag = sequelize.define("Tag", {
    name: DataTypes.STRING
  }, {
    tableName: "tags",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        Tag.belongsTo(models.User);
      }
    }
  });

  return Tag;
}
