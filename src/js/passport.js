import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import * as AuthProviders from "./constants/auth-providers";
import models from "./models/";

const { User, Option } = models;

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
        photo: profile.photos[0].value,
        today_upload: 0,
        installed: false,
        provider: AuthProviders.GOOGLE,
        provider_id: profile.id,
        Option: {
          theme: "dark"
        }
      }, {
        include: [Option]
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
