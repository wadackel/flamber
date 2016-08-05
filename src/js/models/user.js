import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  icon: String,
  email: String,
  limit: Number,
  usage: Number,
  provider: String,
  installed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });


UserSchema.statics.createFromGoogle = function(profile) {
  return this.create({
    name: profile.displayName,
    icon: profile.photoLink,
    email: profile.emailAddress,
    limit: profile.limit,
    usage: profile.usage,
    provider: "google"
  });
};

UserSchema.statics.createProviderFactory = function(provider, profile) {
  let user = null;

  switch (provider) {
    case "google":
      user = this.createFromGoogle(profile);
      break;
  }

  return !user
    ? Promise.reject(new Error(`${provider} provider name not defined`))
    : user.save();
};


export default mongoose.model("User", UserSchema);
