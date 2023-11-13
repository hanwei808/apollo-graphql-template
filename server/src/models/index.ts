import mongoose from 'mongoose';
import { dbUri } from '../config/config.default';

// 连接 MongoDB 数据库
mongoose.connect(dbUri)
  
const db = mongoose.connection

// 当连接失败的时候
db.on('error', err => {
console.log('MongoDB 数据库连接失败', err)
})

// 当连接成功的时候
db.once('open', function () {
console.log('MongoDB 数据库连接成功')
})

// 导入模型
import { userSchema } from './user';

// 组织导出模型类
export default {
    User: mongoose.model('User', userSchema),
  }
