import dotenv from "dotenv";
dotenv.config();

import mongoose, { Schema } from "mongoose";
import jwt from "jwt-simple";

const { JWT_SECRET } = process.env;

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


// Static
UserSchema.statics.findByJwtToken = function(token) {
  try {
    return this.findById(jwt.decode(token, JWT_SECRET).id);

  } catch (error) {
    return Promise.reject(error);
  }
};


export default mongoose.model("User", UserSchema);
