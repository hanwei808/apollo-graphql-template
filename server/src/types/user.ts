import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId
  username: string
  password: string
  email: string
  bio: string
  image: string
  token: string
}

export interface Context {
  loggedInUser: UserDocument
}