import mongoose, { Schema } from "mongoose";

const BoardSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  itemCount: { type: String, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

const Board = mongoose.model("Board", BoardSchema);

export default Board;
