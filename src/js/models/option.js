// @flow
export default function(sequelize: any, DataTypes: any) {
  const Option = sequelize.define("Option", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    theme: DataTypes.STRING
  }, {
    tableName: "options",
    timestamps: false,
    underscored: true,
    classMethods: {
    },
    instanceMethods: {
    }
  });

  return Option;
}
