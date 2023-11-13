import Users from './user';
import models from '../models/index';

export default {
    users: new Users(await models.User.createCollection())
  }