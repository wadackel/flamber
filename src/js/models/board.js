import mongoose, { Schema } from "mongoose";
import { updateItemThumbnailIfNeeded } from "../utils/drive/items";

const BoardSchema = new Schema({
  name: { type: String, required: true },
  firstItem: { type: Schema.Types.ObjectId, ref: "Item" },
  itemCount: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

BoardSchema.set("toJSON", { virtuals: true });
BoardSchema.set("toObject", { virtuals: true });

BoardSchema.statics.findAll = drive =>
  this.find()
    .populate("firstItem")
    .then(boards =>
      Promise.all(boards.map(board =>
        !board.firstItem
          ? board
          : updateItemThumbnailIfNeeded(drive, board.firstItem)
      )).then(() => boards)
    );

export default mongoose.model("Board", BoardSchema);
