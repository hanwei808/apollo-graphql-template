import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { UserDocument, Context } from '../types/user';

export default class Users extends MongoDataSource<UserDocument, Context> {

  getUsers() {
    return this.collection.find().toArray();
  }

  getUserById(userId: ObjectId) {
    return this.collection.findOne({_id: new ObjectId(userId)});
  }

  getUserByEmail(email: string) {
    return this.collection.findOne({email})
  }

  getUserByUsername(username: string) {
    return this.collection.findOne({username});
  }

  register(_args: UserDocument) {
    return this.collection.insertOne({..._args})
  }
  
  updateUser (userId: ObjectId, data: UserDocument) {
    return this.collection.findOneAndUpdate(
      { _id: userId },
      { $set: data },
      { returnDocument: 'after' }
    )
  }
}