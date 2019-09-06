const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = require('mongoose').Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true }
  // password: { type: String, required: true },
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // dob: { type: Date /* , required: true  */ },
  // emailVerified: { type: Boolean, default: false },
  // passwordResetToken: { type: String, default: null },
  // passwordResetExpires: { type: Date, default: 0 }
});

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.verifyPassword = async function(password) {
  const passwordMatch = await bcrypt.compare(password, this.password);
  return passwordMatch;
};

const tokenSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  token: { type: String, required: true },
  /* 'createdAt' - 'expires' set to 24hrs (*60*60) in seconds */
  createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

// eslint-disable-next-line new-cap
const userModel = new mongoose.model('users', userSchema);

const tokenModel = new mongoose.model('tokens', tokenSchema);

module.exports = { userModel, tokenModel };
