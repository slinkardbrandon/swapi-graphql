import { Person } from './generated';

export type PersonWithStarShipLinks = Omit<Person, 'starships'> & {
  starships: string[];
};
