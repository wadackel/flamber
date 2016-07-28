import mongoose, { Schema } from "mongoose";
import * as Themes from "../constants/themes";
import * as Layout from "../constants/layouts";

const SettingSchema = new Schema({
  theme: { type: String, default: Themes.DEFAULT },
  boardsLayout: { type: String, default: Layout.GRID },
  itemsLayout: { type: String, default: Layout.GRID },
  itemsSize: { type: Number, default: 280 }
});

const Setting = mongoose.model("Setting", SettingSchema);

export default Setting;
