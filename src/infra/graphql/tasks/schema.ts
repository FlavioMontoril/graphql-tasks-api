export const tasksTypeDefs = `
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
    archived: Boolean!
  }

  input CreateTaskInput {
    code: String!
    summary: String!
    description: String!
    reporter: String!
    assignee: String
    status: TaskStatus
  }

  type TasksPage {
  tasks: [Task!]!
  total: Int!
}

  type Query {
    tasks(page: Int, perPage: Int): TasksPage!
    taskById(id: ID!): Task
    taskByCode(code: String!): Task
    tasksCount: Int!
  }

  type Mutation {
    createTask(input: CreateTaskInput!):Task!
  }
`;
