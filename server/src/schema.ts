import { typeDefs } from './typeDefs/user';
import { resolvers } from './resolvers/user';
import { makeExecutableSchema } from '@graphql-tools/schema';
import upperDirectiveTransformer from './directives/upper';
import authDirectiveTransformer from './directives/auth';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = upperDirectiveTransformer(schema, 'upper');
schema = authDirectiveTransformer(schema, 'auth');

export default schema
