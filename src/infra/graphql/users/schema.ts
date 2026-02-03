export const userTypeDefs = `
type User {
    id: ID!
    name: String!
    department: String!
    email: String!
    passwordHash: String!
    createdAt: String!
    updatedAt: String
}
input CreateUserInput {
    name: String!
    department: String!
    email: String!
    passwordHash: String!
}
input UpdateUserInput {
    name: String!
    department: String!
}
type Query {
    users: [User!]!
}
type Mutation {
    create(input: CreateUserInput!): User!
    update(input: UpdateUserInput!, id: ID!): User!
}
`;