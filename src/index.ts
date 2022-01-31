import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { dataSources } from './dataSources';
import path from 'path';
import { getShipId } from './functions/getShipId';
import { Person, PersonWithStarShipLinks } from './types';

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
    Person: {
      // the "Person" type has a "starships" field, which we
      // essentially attach to here, so when a starship field is detected
      // graphql will automatically pass through to this
      starships: async (
        parent: PersonWithStarShipLinks,
        _,
        { dataSources }
      ) => {
        return Promise.all(
          parent.starships.map(ship =>
            dataSources.starshipApi.starship(getShipId(ship))
          )
        );
      },
    },
    Starship: {},
  },
});

const server = new ApolloServer({ schema: executableSchema, dataSources });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
