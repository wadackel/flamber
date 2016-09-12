import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import * as AuthProviders from "./constants/auth-providers";
import User from "./models/user";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK
} = process.env;


// Google
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({ provider: "google", providerId: profile.id })
    .then(user => {
      if (user) return user;

      return new User({
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: AuthProviders.GOOGLE,
        providerId: profile.id
      }).save();
    })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
}));


export default passport;
