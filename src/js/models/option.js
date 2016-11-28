// @flow
export default function(sequelize: any, DataTypes: any) {
  const Option = sequelize.define("Option", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    tableName: "options",
    timestamps: false,
    underscored: true,
    classMethods: {
      associate(models) {
        Option.belongsTo(models.User);
      }
    },
    instanceMethods: {
    }
  });

  return Option;
}
