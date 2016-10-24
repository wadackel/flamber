export default function(sequelize: any, DataTypes: any) {
  const Board = sequelize.define("boards", {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    classMethods: {
      findAllByUser(user_id: number, query?: Object = {}, offset?: number = 0, limit?: ?number = null) {
        const args = {
          where: { ...query, user_id },
          offset
        };

        if (limit != null) {
          args.limit = limit;
        }

        return this.findAll(args);
      },

      removeByUserAndId(user_id: number, id: number) {
        throw new Error("TODO");
      }
    }
  });

  return Board;
}
// BoardSchema.statics.updateByUserAndIdFromObject = function(user, id, newProps) {
//   const fields = _.keys(this.schema.paths);
//
//   return this.findOne({ _id: id, user })
//     .then(entity => {
//       fields.forEach(key => {
//         if (newProps.hasOwnProperty(key)) {
//           entity[key] = newProps[key];
//         }
//       });
//
//       entity.modified = new Date();
//
//       return entity.save();
//     });
// };
//
// BoardSchema.statics.addItemByUserAndId = function(user, id, itemId) {
//   return this.findOne({ _id: id, user })
//     .then(entity => entity.addItem(itemId));
// };
//
// BoardSchema.statics.removeItemByUserAndId = function(user, id, itemId) {
//   return this.findOne({ _id: id, user })
//     .then(entity => entity.removeItem(itemId));
// };
//
//
// // Instance methods
// BoardSchema.methods.addItem = function(itemId) {
//   this.items = [...this.items, itemId];
//   return this.save();
// };
//
// BoardSchema.methods.removeItem = function(itemId) {
//   this.items = this.items.filter(id => id.toString() !== itemId);
//   return this.save();
// };
//
//
// // Middleware
// BoardSchema.pre("remove", function(next) {
//   Promise.all(this.items.map(id => Item.removeByUserAndId(this.user, id)))
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       next();
//     });
// });
//
//
// export default mongoose.model("Board", BoardSchema);
