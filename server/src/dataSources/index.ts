import Users from './user';
import models from '../models/index';

/**
 * 使用 User 模型的集合创建并导出 Users 数据源的新实例。
 * @returns {Object} 包含 Users 数据源的对象。
 */
export default {
    users: new Users(await models.User.createCollection())
  }