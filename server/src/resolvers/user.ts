import { GraphQLError } from 'graphql';
import { jwtSecret } from '../config/config.default';
import { sign } from '../utils/jwt';
import { md5 } from '../utils/md5';

export const resolvers = {
    Query: {
      currentUser: async (_parent: any, _args: any, { user }: any) => {
        return user
      }
    },
    Mutation: {
      register: async (_parent: any, { user }, { dataSources }) => {
        const users = dataSources.users
        const user1 = await users.getUserByUsername(user.username)
        if (user1) {
          throw new GraphQLError(
            `User 的用户名 ${user.username} 已存在`
          );
        }
        const user2 = await users.getUserByEmail(user.email)
        if (user2) {
          throw new GraphQLError(
            `User 的邮箱 ${user.email} 已存在`
          );
        }
        user.password = md5(user.password)
        const userData = await dataSources.users.register(user)

        const token = await sign({
          _id: userData.insertedId
        }, jwtSecret, {
          expiresIn: 60 * 60 * 24
        })

        return {
          user: {
            _id: userData.insertedId,
            ...user,
            token
          }
        }
      },

      login: async (_parent: any, { user }, { dataSources }) => {
        const users = dataSources.users
        const userData = await users.getUserByUsername(user.username)
        if (!userData) {
          throw new GraphQLError(
            `User 的用户名 ${user.username} 不存在`
          );
        }
        if (md5(user.password) !== userData.password) {
          throw new GraphQLError(
            `密码错误`
          );
        }

        const token = await sign({
          _id: userData._id
        }, jwtSecret, {
          expiresIn: 60 * 60 * 24
        })

        return {
          user: {
            ...userData,
            token
          }
        }
      },

      updateUser: async (_parent: any, { user: userInput }, { dataSources, user }) => {
        if (userInput.password) {
          userInput.password = md5(userInput.password)
        }

        const ret = await dataSources.users.updateUser(user._id, userInput)

        return {
          user: ret.value
        }
      },
    }
}