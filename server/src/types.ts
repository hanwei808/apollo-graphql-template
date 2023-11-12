import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId
  username: string
  password: string
  email: string
}

export interface Context {
  loggedInUser: UserDocument
}