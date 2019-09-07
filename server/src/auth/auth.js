const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Model = require('../models/models');
const userModel = Model.userModel;
const SECRET = process.env.TOKEN_SECRET;

/* Setup passport to handle signup */
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, firstName, lastName, done) => {
      try {
        const user = await userModel.create({
          email,
          password,
          firstName,
          lastName
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        console.log(user);

        if (!user) {
          return done(null, false, { message: 'Email is not registered!' });
        }
        const validate = await user.verifyPassword(password);
        if (!vallidate) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user, { message: 'Login successful' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
