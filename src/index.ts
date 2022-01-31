import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { dataSources } from './dataSources';
import path from 'path';
import { Person } from './types';
import * as resolvers from './resolvers';

const rootSchemaPath = path.resolve('src', 'schemas', 'schema.gql');

const executableSchema = makeExecutableSchema({
  typeDefs: loadSchemaSync(rootSchemaPath, {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: {
    Query: {
      getPerson: async (_, args, { dataSources }): Promise<Person> => {
        return dataSources.peopleApi.getPerson(args.id);
      },
    },
    Person: resolvers.person,
    Starship: resolvers.starship,
  },
});

const server = new ApolloServer({ schema: executableSchema, dataSources });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
