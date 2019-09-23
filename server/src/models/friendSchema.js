import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const friendSchema = new Schema({
  id: { type: mongoose.Types.ObjectId },
  email: { type: String },
  fullName: { type: String }
});

export default friendSchema;
