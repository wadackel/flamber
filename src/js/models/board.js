// @flow
import { pickBy } from "lodash";

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
        Board.hasMany(models.Item, {
          onDelete: "cascade",
          hooks: true
        });
        Board.hasOne(models.Item, {
          as: "Cover",
          foreignKey: "cover_id",
          onDelete: "cascade",
          hooks: true
        });
      },

      filterEditableAttributes(attributes: Object) {
        const readOnly = ["id", "user_id", "Cover"];
        const tableAttributes = Object.keys(Board.tableAttributes).filter(k => readOnly.indexOf(k) < 0);

        return pickBy(attributes, (value: any, key: string): boolean =>
          tableAttributes.indexOf(key) > -1
        );
      }
    },

    instanceMethods: {
      includeAll() {
        const { models } = this.sequelize;

        return Board.find({
          where: { id: this.id },
          include: [
            {
              model: models.Item,
              include: [
                models.Tag
              ]
            },
            {
              model: models.Item,
              as: "Cover"
            }
          ]
        });
      },

      updateFromAttributes(attributes: Object) {
        const validAttributes = Board.filterEditableAttributes(attributes);

        return this.update(validAttributes)
          .then(entity =>
            attributes.hasOwnProperty("Cover")
              ? entity.setCover(null).then(() => entity.setCover(attributes.Cover).then(() => entity.reload()))
              : entity
          );
      }
    }
  });

  return Board;
}
