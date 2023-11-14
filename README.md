# apollo-graphql-template

服务端：Apollo GraphQL API + TypeScript，客户端：Vue3 + apollo-client

## 服务端 server

[Apollo Server v4](https://www.apollographql.com/docs/apollo-server/getting-started)

目录结构

> src
>
> > config：配置文件
> > dataSources：数据源
> > directives：自定义指令
> > models：数据模型
> > schema
> > resolvers：解析器
> > typeDefs：类型定义
> > types：类型
> > utils：工具
> >
> > > jwt.ts：认证
> > > md5.ts：加密
> > > index.ts：加载服务、中间件

初始化项目

```JavaScript
    npm init -y

    // 有版本限制，以此为准
    // node v20+ 需在 script start 中配置 node --no-warnings=ExperimentalWarning --loader
    // server/package.json
    {
        "name": "server",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "type": "module",
        "scripts": {
            "build": "tsc",
            "start": "nodemon --exec node --no-warnings=ExperimentalWarning --loader ts-node/esm ./src/index.ts"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "@apollo/server": "^4.7.0",
            "@types/body-parser": "^1.19.2",
            "@types/cors": "^2.8.13",
            "apollo-datasource-mongodb": "^0.5.4",
            "body-parser": "^1.20.2",
            "express": "^4.18.2",
            "graphql": "^16.6.0",
            "graphql-tools": "^9.0.0",
            "jsonwebtoken": "^8.5.1",
            "mongoose": "^7.1.0"
        },
        "devDependencies": {
            "@types/node": "^18.16.2",
            "nodemon": "^2.0.22",
            "ts-node": "^10.9.1",
            "typescript": "^5.2.2"
        }
    }
```

安装

```JavaScript
    npm install
```

配置 TypeScript

```JavaScript
    // server/tsconfig.json
    {
        "compilerOptions": {
            "rootDirs": ["src"],
            "outDir": "dist",
            "lib": ["es2020"],
            "target": "es2020",
            "module": "esnext",
            "moduleResolution": "node",
            "esModuleInterop": true,
            "types": ["node"]
        },
        "include": ["src"],
        "exclude": ["node_modules"],
        "ts-node": {
            "esm": true,
            "experimentalSpecifierResolution": "node"
        }
    }
```

启动

```JavaScript
    npm start
```

## 客户端 client

[@vue/apollo-composable v4 官方文档](https://v4.apollo.vuejs.org/zh-cn/guide-composable/query.html)
