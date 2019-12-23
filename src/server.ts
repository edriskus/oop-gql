require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { context } from "./Utils/Context";
import { resolvers } from "./Resolvers/Root";
import { typeDefs } from "./Schema/Root";

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
