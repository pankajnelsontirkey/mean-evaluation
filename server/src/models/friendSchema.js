import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const friendSchema = new Schema({
  email: { type: String },
  fullName: { type: String }
});

export default friendSchema;
