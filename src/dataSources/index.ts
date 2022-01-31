import { PeopleApi } from './PeopleApi';
import { StarshipApi } from './StarshipApi';

export type DataSources = {
  peopleApi: PeopleApi;
  starshipApi: StarshipApi;
};

export const dataSources = (): DataSources => ({
  peopleApi: new PeopleApi(),
  starshipApi: new StarshipApi(),
});
