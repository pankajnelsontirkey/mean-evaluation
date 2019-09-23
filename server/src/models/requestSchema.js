import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
  sender: new Schema({
    id: { type: String },
    email: { type: String }
  }),
  receiver: new Schema({
    id: { type: String },
    email: { type: String }
  }),
  body: new Schema({
    title: { type: String },
    /* type: send/received */
    type: { type: String },
    message: { type: String }
  })
});

export default requestSchema;
