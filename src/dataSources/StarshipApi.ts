import { RESTDataSource } from 'apollo-datasource-rest';

// Since this API shares the same base url as the PeopleAPI,
// they could absolutely be the same class, this was just
// an experiment to see how we could make multiple related APIs
// interact with eachother.
export class StarshipApi extends RESTDataSource {
  public constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  public async starship(id: number) {
    console.log('star ship id', id);
    return this.get(`/starships/${id}`);
  }
}
