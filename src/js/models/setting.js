import mongoose, { Schema } from "mongoose";
import * as Themes from "../constants/themes";
import * as Layout from "../constants/layouts";

const SettingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  theme: { type: String, default: Themes.DEFAULT },
  boardsLayout: { type: String, default: Layout.GRID },
  itemsLayout: { type: String, default: Layout.GRID },
  itemsSize: { type: Number, default: 280 }
}, {
  versionKey: false
});

SettingSchema.set("toJSON", { virtuals: true });
SettingSchema.set("toObject", { virtuals: true });


export default mongoose.model("Setting", SettingSchema);
