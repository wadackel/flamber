// @flow

export default function(sequelize: any) {
  const ItemTags = sequelize.define("ItemTags", {}, {
    tableName: "item_tags"
  });

  return ItemTags;
}
