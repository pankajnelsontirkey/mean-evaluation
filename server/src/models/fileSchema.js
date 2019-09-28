import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
  { fileId: { type: mongoose.Types.ObjectId } },
  { timestamps: true }
);

export default fileSchema;
