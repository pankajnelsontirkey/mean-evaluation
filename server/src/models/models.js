import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const Schema = require('mongoose').Schema;
const SECRET = process.env.SECRET;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date /* , required: true  */ },
  emailVerified: { type: Boolean, default: false },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null }
});

/* to replace plain text password with its hash before saving to db */
userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

/* to validate  password that arrives from login with the one save in db */
userSchema.methods.validatePassword = async function(password) {
  const passwordMatch = await bcrypt.compare(password, this.password);
  return passwordMatch;
};

/* to generate a JWT token to be sent as response on successful login */
userSchema.methods.generateJWT = async function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    },
    SECRET
  );
};

/* for use when creating tokens for emailVerification & forgot/reset password use cases */
const tokenSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  token: { type: String, required: true },
  /* 'createdAt' - 'expires' set to 24hrs (*60*60) in seconds */
  createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

// eslint-disable-next-line new-cap
export const userModel = new mongoose.model('users', userSchema);
export const tokenModel = new mongoose.model('tokens', tokenSchema);
