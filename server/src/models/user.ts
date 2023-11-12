import mongoose, { Schema } from "mongoose";
import { ObjectId } from 'mongodb';

const userSchema = new Schema({
  _id: ObjectId,
  username: String,
  password: String,
  email: String,
});

export const User = mongoose.model("user", userSchema);