// @flow

export default function(sequelize: any, DataTypes: any) {
  const Option = sequelize.define("Option", {
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
