import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* for use when creating tokens for emailVerification & forgot/reset password use cases */
const tokenSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  token: { type: String, required: true },
  /* 'createdAt' - 'expires' set to 24hrs (*60*60) in seconds */
  createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

tokenSchema.methods.verifyToken = async function() {
  /* return boolean */
};

export const tokenModel = new mongoose.model('tokens', tokenSchema);
