import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import * as AuthProviders from "./constants/auth-providers";
import models from "./models/";

const { User } = models;

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

  User.findOne({ where: { provider: "google", provider_id: profile.id } })
    .then(user => {
      if (user) return user;

      return User.create({
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: AuthProviders.GOOGLE,
        providerId: profile.id
      });
    })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
}));


export default passport;
