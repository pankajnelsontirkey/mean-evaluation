import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    fileId: { type: mongoose.Types.ObjectId },
    ownerId: { type: mongoose.Types.ObjectId },
    data: {}
  },
  { timestamps: true, strict: false, useNestedStrict: false }
);

export default fileSchema;
