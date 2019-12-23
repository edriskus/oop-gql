import { gql } from "apollo-server";

/**
 * Root GraphQL schema
 */
const Root = gql`
  enum Source {
    meteo
    local
  }
  type Query {
    currentTemperature(city: String!, source: Source!): Float
  }
  type Mutation {
    setCurrentTemperature(city: String!, temperature: Float!): Float
  }
`;

export const typeDefs = [Root];
