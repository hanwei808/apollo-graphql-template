import mongoose, { ObjectId } from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from 'graphql';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { User as UserModel } from './models/user';
import Users from './dataSources/users';
import pkg from 'body-parser';
import { UserDocument } from './types';
const { json } = pkg;

await mongoose.connect('mongodb://127.0.0.1:27017/ragnemt');

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String
    password: String
    email: String
  }
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type Mutation {
    addUser(username: String, password: String, email: String): User
  }
`;

const resolvers = {
  Query: {
    users: (_parent: any, _args: any, { dataSourses }) => {
      return  dataSourses.users.getUsers();
    },
    user: (_parent: any, { _id }, { dataSourses }) => {
      return dataSourses.users.getUser(_id)
        .then((res: UserDocument) => {
          if (!res) {
            throw new GraphQLError(
              `User with User Id ${_id} does not exist.`
            );
          }
          return res;
        });
    },
  },
  Mutation: {
    addUser: async (_parent: any, { username, password, email }, { dataSourses }) => {
      const users = dataSourses.users
      console.log('111 users', users)
      const user1 = await users.findByUsername(username)
      console.log('222 user1', user1)
      if (user1) {
        throw new GraphQLError(
          `User with username ${username} already exists.`
        );
      }
      return dataSourses.users.addUser(username, password, email)
        .then((res: { insertedIds: ObjectId[]; }) => ({ _id: res.insertedIds[0], username, password, email }))
    }
  }
}

interface MyContext {
  dataSources?: {
    users: Users;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});
await server.start();

app.use(
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      dataSourses: {
        users: new Users(await UserModel.createCollection())
      }
    }),
  }),
);

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`))