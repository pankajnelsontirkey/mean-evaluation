import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

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
    throw Error(error);
  }
});

/*  */

userSchema.methods.verifyPassword = async function(password) {
  try {
    let passCheck = await bcrypt.compare(password, this.password);
    return passCheck;
  } catch (e) {
    console.log(`verifyPassword catch block: ${e}`);
  }
};

// eslint-disable-next-line new-cap
export const userModel = new mongoose.model('users', userSchema);
