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
  role: { type: String, default: 'user' },
  emailVerified: { type: Boolean, default: false },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null }
});

/* to replace plain text password with its hash before saving to db */
userSchema.pre('save', async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/* to validate  password that arrives from login with the one save in db */
userSchema.methods.validatePassword = async function(password) {
  try {
    const passwordMatch = await bcrypt.compare(password, this.password);
    return passwordMatch;
  } catch (error) {
    return next(error);
  }
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

// eslint-disable-next-line new-cap
export const userModel = new mongoose.model('users', userSchema);
