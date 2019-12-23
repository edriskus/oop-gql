import { currentTemperature, setCurrentTemperature } from "./Temperature";

/**
 * GraphQL Resolver map
 */
export const resolvers = {
  Query: {
    currentTemperature
  },
  Mutation: {
    setCurrentTemperature
  }
};
