import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // dob: { type: Date /* , required: true  */ },
  role: { type: String, default: 'user' },
  emailVerified: { type: Boolean, default: false },
  emailToken: { type: String, default: null },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null }
});

// eslint-disable-next-line new-cap
const userModel = new mongoose.model('users', userSchema);

export default userModel;
