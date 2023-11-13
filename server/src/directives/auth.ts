import { GraphQLSchema, GraphQLFieldConfig, defaultFieldResolver, GraphQLError } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { verify } from '../utils/jwt'
import { jwtSecret } from '../config/config.default';

function authDirectiveTransformer(
  schema: GraphQLSchema, 
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    // 在模式中的每个对象字段上执行一次
    [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, any>) => {
      // 检查这个字段是否有指定的指令
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        // 获取这个字段原来的解析器
        const { resolve = defaultFieldResolver } = fieldConfig;

        // 替换原始的解析器，用一个先调用原始解析器，然后将其结果转换为大写的函数
        fieldConfig.resolve = async function (
            source: any, 
            args: { [argName: string]: any }, 
            context: any, 
            info: any
          ) {
            const { token, dataSources } = context
            if (!token) {
                throw new GraphQLError('未授权', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            try {
                const decodedData = await verify(token, jwtSecret)
                const user = await dataSources.users.getUserById(decodedData._id)
        
                // 把当前登录用户挂载到 context 上下文对象中，给后续的 resolve 使用
                context.user = user
              } catch (err) {
                throw new GraphQLError('未授权', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
              }
              const result = await resolve(source, args, context, info)
              return result
          };
          return fieldConfig;
      }
    },
  });
}

export default authDirectiveTransformer;
