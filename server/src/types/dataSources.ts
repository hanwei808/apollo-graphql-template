import Users from '../dataSources/user';

export interface MyContext {
    dataSources?: {
        users: Users;
    };
}