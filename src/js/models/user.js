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
});

const User = mongoose.model("User", UserSchema);

User.createFromGoogle = function(profile) {
  return new User({
    name: profile.displayName,
    icon: profile.photoLink,
    email: profile.emailAddress,
    limit: profile.limit,
    usage: profile.usage,
    provider: "google"
  });
};

User.createProviderFactory = function(provider, profile, callback) {
  let user = null;
  switch (provider) {
    case "google":
      user = User.createFromGoogle(profile);
      break;
  }

  if (!user) {
    return callback(new Error(`${provider} provider name not defined`), null);
  }

  user.save()
    .then(savedUser => {
      callback(null, savedUser);
    })
    .catch(error => {
      callback(error, null);
    });
};

export default User;
