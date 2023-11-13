import { Schema } from "mongoose";
import { ObjectId } from 'mongodb';

export const userSchema = new Schema({
  _id: ObjectId,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: null
  }
});