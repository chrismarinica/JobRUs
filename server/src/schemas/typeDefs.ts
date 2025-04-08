import { gql } from 'graphql-tag';

const typeDefs = gql`
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input JobInput {
    jobId: String!
    title: String!
    company: String!
    location: String!
  }

  type Query {
    me: User
    
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    jobCount: Int!
    savedJobs: [Job]
  }

  type Auth {
    token: String!
    user: User
  }

  type Job {
    jobId: String!
    title: String!
    company: String!
    location: String!
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveJob(input: JobInput!): User
    deleteJob(jobId: String!): User
  }
`;

export default typeDefs;


