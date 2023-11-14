import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { MyContext } from './types/dataSources';
import schema from './schema/user'
import dataSources from './dataSources/index';
import pkg from 'body-parser';

const { json } = pkg;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});
await server.start();

app.use(
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
      dataSources
    }),
  }),
);

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`))