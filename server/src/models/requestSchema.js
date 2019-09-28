import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
  from: {
    type: { id: { type: mongoose.Types.ObjectId }, email: { type: String } },
    required: true
  },
  to: {
    type: { id: { type: mongoose.Types.ObjectId }, email: { type: String } },
    required: true
  },
  type: { type: String, required: true },
  data: { type: { message: String, files: [mongoose.Types.ObjectId] } }
});

export default requestSchema;
