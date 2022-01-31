import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getPerson(id: ID!): Person!
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    gender: String
    starships: [Starship]
  }

  type Starship {
    name: String
    model: String
    manufacturer: String
    crew: String
    passengers: String
  }
`;
