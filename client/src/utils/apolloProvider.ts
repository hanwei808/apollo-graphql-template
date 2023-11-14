import { ApolloClient, InMemoryCache } from '@apollo/client/core'

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
})

export default apolloClient