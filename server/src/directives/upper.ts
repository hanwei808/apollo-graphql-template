import { GraphQLSchema, GraphQLFieldConfig, defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

function upperDirectiveTransformer(
  schema: GraphQLSchema, 
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    // 在模式中的每个对象字段上执行一次
    [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, any>) => {
      // 检查这个字段是否有指定的指令
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        // 获取这个字段原来的解析器
        const { resolve = defaultFieldResolver } = fieldConfig;

        // 替换原始的解析器，用一个先调用原始解析器，然后将其结果转换为大写的函数
        fieldConfig.resolve = async function (
          source: any, 
          args: { [argName: string]: any }, 
          context: any, 
          info: any
        ) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}

export default upperDirectiveTransformer;
