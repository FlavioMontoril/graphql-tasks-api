// src/infra/graphql/schema.ts
import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum TaskStatus {
    OPEN
    IN_PROGRESS
    DONE
    ARCHIVED
  }

  type Task {
    id: ID!
    code: String!
    summary: String!
    description: String!
    reporter: String!
    assignee: String
    status: TaskStatus
    createdAt: String!
    updatedAt: String
    archived: Boolean
  }

  input CreateTaskInput {
    code: String!
    summary: String!
    description: String!
    reporter: String!
    assignee: String
    status: TaskStatus
  }

  type Query {
    tasks(page: Int, perPage: Int): [Task!]!
    task(id: ID!): Task
    taskByCode(code: String!): Task
    tasksCount: Int!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Boolean!
  }
`;
