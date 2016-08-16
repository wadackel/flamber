import mongoose, { Schema } from "mongoose";
import * as Themes from "../constants/themes";
import * as Layout from "../constants/layouts";
import * as OrderBy from "../constants/order-by";
import * as Order from "../constants/order";

const SettingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  theme: { type: String, default: Themes.DEFAULT },
  boardsLayout: { type: String, default: Layout.GRID },
  itemsLayout: { type: String, default: Layout.GRID },
  itemsSize: { type: Number, default: 280 },
  itemsOrderBy: { type: String, default: OrderBy.CREATED },
  itemsOrder: { type: String, default: Order.ASC },
  boardsOrderBy: { type: String, default: OrderBy.CREATED },
  boardsOrder: { type: String, default: Order.ASC }
}, {
  versionKey: false
});

SettingSchema.set("toJSON", { virtuals: true });
SettingSchema.set("toObject", { virtuals: true });


export default mongoose.model("Setting", SettingSchema);
