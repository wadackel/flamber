import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  fileId: { type: String, required: true },
  boardId: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, default: "" },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  thumbnail: { type: String, default: "" },
  tags: { type: Array, default: [] },
  palette: { type: Array, default: [] },
  favorite: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
