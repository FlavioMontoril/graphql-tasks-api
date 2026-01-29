import { makeExecutableSchema } from "@graphql-tools/schema";
import { tasksTypeDefs } from "./tasks/schema";
import { tasksResolvers } from "./tasks/resolvers";

export const schema = makeExecutableSchema({
  typeDefs: [tasksTypeDefs /*, usersTypeDefs, productsTypeDefs */],
  resolvers: [tasksResolvers /*, usersResolvers, productsResolvers */],
});
