import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const friendSchema = new Schema({
  id: { type: mongoose.Types.ObjectId, unique: true },
  email: { type: String, unique: true },
  fullName: { type: String }
});

export default friendSchema;
