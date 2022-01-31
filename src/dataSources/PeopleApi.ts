import { RESTDataSource } from 'apollo-datasource-rest';

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  // API URL strings for each starship associated with the person
  starships: string[];
};

export class PeopleApi extends RESTDataSource {
  public constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  public async getPerson(id: number): Promise<Person> {
    return this.get(`/people/${id}`);
  }
}
