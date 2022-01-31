import { RESTDataSource } from 'apollo-datasource-rest';
import { PersonWithStarShipLinks } from '../types';

export class PeopleApi extends RESTDataSource {
  public constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  public async getPerson(id: number): Promise<PersonWithStarShipLinks> {
    return this.get(`/people/${id}`);
  }
}
