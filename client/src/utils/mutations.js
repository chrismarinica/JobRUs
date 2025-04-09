import { gql } from '@apollo/client';

export const SAVE_JOB = ``; // fill in using graphQL playground
export const REGISTER_USER = gql`
  mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
  }
}
`; // fill in using graphQL playground
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`; // fill in using graphQL playground