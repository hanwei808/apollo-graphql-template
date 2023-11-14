export const typeDefs = `#graphql
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    bio: String
    image: String
    token: String
  }

  type UserPayload {
    user: User
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    password: String
    email: String
    bio: String
    image: String
  }

  type Query {
    foo: String @auth @upper
    users: [User]
    currentUser: User @auth
  }

  type Mutation {
    # User
    register(user: CreateUserInput): UserPayload
    login(user: LoginInput): UserPayload
    updateUser(user: UpdateUserInput): UserPayload @auth
  }
`;