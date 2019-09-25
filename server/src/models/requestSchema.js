import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
  from: new Schema({
    id: { type: String },
    email: { type: String }
  }),
  to: new Schema({
    id: { type: String },
    email: { type: String }
  }),
  data: new Schema({
    // title: { type: String },
    /* type: send/received */
    type: { type: String },
    body: { type: String }
  })
});

export default requestSchema;
