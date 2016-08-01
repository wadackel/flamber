import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  fileId: { type: String, required: true },
  boardId: { type: Schema.Types.ObjectId, ref: "Board" },
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

ItemSchema.set("toJSON", { virtuals: true });
ItemSchema.set("toObject", { virtuals: true });

export default mongoose.model("Item", ItemSchema);
