// @flow
export default function(sequelize: any, DataTypes: any) {
  const Board = sequelize.define("Board", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    secret: DataTypes.BOOLEAN
  }, {
    tableName: "boards",
    timestamps: true,
    underscored: true,
    classMethods: {
      associate(models) {
        Board.belongsTo(models.User);
        Board.hasMany(models.Item);
      }
    }
  });

  return Board;
}
