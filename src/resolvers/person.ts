import { getShipId } from '../functions/getShipId';
import { PersonWithStarShipLinks } from '../types';

export const person = {
  // the "Person" type has a "starships" field, which we
  // essentially attach to here, so when a starship field is detected
  // graphql will automatically pass through to this
  starships: async (parent: PersonWithStarShipLinks, _, { dataSources }) => {
    return Promise.all(
      parent.starships.map(ship =>
        dataSources.starshipApi.starship(getShipId(ship))
      )
    );
  },
};
