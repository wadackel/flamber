import mongoose, { Schema } from "mongoose";
import * as Themes from "../constants/themes";
import * as Layout from "../constants/layouts";

const SettingSchema = new Schema({
  theme: { type: String, default: Themes.DEFAULT },
  boardsLayout: { type: String, default: Layout.GRID },
  itemsLayout: { type: String, default: Layout.GRID }
});

const Setting = mongoose.model("Setting", SettingSchema);

export default Setting;
