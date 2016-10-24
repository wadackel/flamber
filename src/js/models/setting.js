export default function(sequelize: any, DataTypes: any) {
  const Setting = sequelize.define("settings", {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    classMethods: {
    }
  });

  return Setting;
}
// import _ from "lodash";
// import mongoose, { Schema } from "mongoose";
// import * as Themes from "../constants/themes";
// import * as Layout from "../constants/layouts";
// import * as OrderBy from "../constants/order-by";
// import * as Order from "../constants/order";
//
// const SettingSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   theme: { type: String, default: Themes.DEFAULT },
//   boardsLayout: { type: String, default: Layout.GRID },
//   itemsLayout: { type: String, default: Layout.GRID },
//   itemsSize: { type: Number, default: 280 },
//   itemsOrderBy: { type: String, default: OrderBy.CREATED },
//   itemsOrder: { type: String, default: Order.ASC },
//   boardsOrderBy: { type: String, default: OrderBy.CREATED },
//   boardsOrder: { type: String, default: Order.ASC }
// }, {
//   versionKey: false
// });
//
// SettingSchema.set("toJSON", { virtuals: true });
// SettingSchema.set("toObject", { virtuals: true });
//
//
// SettingSchema.statics.findByUser = function(user) {
//   return this.findOne({ user });
// };
//
//
// SettingSchema.statics.updateByUser = function(user, settings) {
//   return this.findByUser(user)
//     .then(entity => {
//       const fields = _.keys(this.schema.paths);
//
//       fields.forEach(key => {
//         if (settings.hasOwnProperty(key)) {
//           entity[key] = settings[key];
//         }
//       });
//
//       return entity.save();
//     });
// };
//
//
// export default mongoose.model("Setting", SettingSchema);
