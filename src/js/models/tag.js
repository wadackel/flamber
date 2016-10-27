// @flow
export default function(sequelize: any, DataTypes: any) {
  const Tag = sequelize.define("Tag", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    tableName: "tags",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        Tag.belongsTo(models.User);
        Tag.belongsToMany(models.Item, { through: models.ItemTags });
      }
    }
  });

  return Tag;
}
