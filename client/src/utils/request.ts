import { OperationVariables, gql } from '@apollo/client/core';
import client from './apolloProvider';
import { ElMessage } from 'element-plus';

async function executeGraphQLQuery<T extends OperationVariables | undefined>(query: string, variables?: T) {
  try {
    const response = await client.query({
      query: gql`${query}`,
      variables,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        ElMessage.error(error.message);
        console.error(error);
    } else {
        throw error;
    }
    return error;
  }
}

async function executeGraphQLMutate(mutation: string) {
    try {
      const response = await client.mutate({
        mutation: gql`${mutation}`
      });
      return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            ElMessage.error(error.message);
            console.error(error);
        } else {
            throw error;
        }
        return error;
    }
  }

export { executeGraphQLQuery, executeGraphQLMutate };