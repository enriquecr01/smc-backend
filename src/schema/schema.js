import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from '../resolvers/resolvers';

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});