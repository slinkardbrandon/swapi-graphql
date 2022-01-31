import { ApolloServer } from 'apollo-server';
import { IResolvers } from '@graphql-tools/utils';
import { Person } from './dataSources/PeopleApi';
import { StarshipApi } from './dataSources/StarshipApi';
import { dataSources } from './dataSources';
import { typeDefs } from './typeDefs';

// const resolvers: IResolvers<unknown, unknown, unknown, unknown> = {

//   Starship: {
//     starship: async (a, args, { dataSources }) => {
//       console.log(a);
//     }
//   }
// }

const server = new ApolloServer({
  typeDefs,
  dataSources,
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
      starships: async (parent: Person, _, { dataSources }) => {
        // TODO: Parse the id from the url and pass it through to the starships API
        console.log('blah', parent.starships);
        console.log({ dataSources });

        return Promise.all(
          parent.starships.map(ship => {
            // ship is a URL that looks like this:
            // https://swapi.dev/api/starships/12/
            // get the id from the URL and then fetch the starship data.
            const shipUrlParts = ship.split('/');
            const shipId = shipUrlParts[shipUrlParts.length - 2];
            return dataSources.starshipApi.starship(shipId);
          })
        );
      },
    },
    Starship: {},
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
