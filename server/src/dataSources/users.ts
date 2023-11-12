import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { UserDocument, Context } from '../types';

export default class Users extends MongoDataSource<UserDocument, Context> {

  getUsers() {
    return this.collection.find().toArray();
  }

  getUser(userId: ObjectId) {
    return this.collection.findOne({_id: new ObjectId(userId)});
  }

  findByUsername(username: string) {
    return this.collection.findOne({username});
  }

  addUser(username: string, password: string, email: string) {
    return this.collection.insertMany([{username, password, email}]);
  }
}