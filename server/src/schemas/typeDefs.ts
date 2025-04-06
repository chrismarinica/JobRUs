//todo: define Query and Mutation types
const typeDefs=`

input UserInput{
    username: String!
    email: String!
    password: String!
}

input JobInput{
    jobId: String!
    title: String!
    company: String!
    location: String!
}

type Query{
me: User
}

type User {

    _id: ID!
    username: String!
    email: String!
    jobCount: Int!
    saveJobs:[Jobs]
}

type Auth{
    token: ID!
    user: User
}

type Jobs{
    jobId: String!
    title: String!
    company: String!
    location: String!
}

type Mutations{
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveJob(input: JobInput!): User
    deleteJob(jobId: String!): User
}
`;

export default typeDefs;

