import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  avatar: String,
  provider: String,
  providerId: String,
  todayUpload: { type: Number, default: 0 },
  installed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });


export default mongoose.model("User", UserSchema);
