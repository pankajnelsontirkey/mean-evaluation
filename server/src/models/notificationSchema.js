import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  from: {
    type: { id: { type: mongoose.Types.ObjectId }, email: { type: String } }
  },
  type: { type: String, required: true },
  data: { type: { message: String, requestId: mongoose.Types.ObjectId } }
});
export default notificationSchema;
