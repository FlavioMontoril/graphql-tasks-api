import { makeExecutableSchema } from "@graphql-tools/schema";
import { tasksTypeDefs } from "./tasks/schema";
import { tasksResolvers } from "./tasks/resolvers";
import { userTypeDefs } from "./users/schema";
import { userResolvers } from "./users/resolvers";

export const schema = makeExecutableSchema({
  typeDefs: [tasksTypeDefs, userTypeDefs],
  resolvers: [tasksResolvers, userResolvers],
});
