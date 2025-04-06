const GRAPHQL_ENDPOINT = '/graphql';

export const loginUser = async ({ email, password }) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
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
      `,
      variables: { email, password },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.login;
};

export const signupUser = async ({ username, email, password }) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation Signup($username: String!, $email: String!, $password: String!) {
          addUser(username: $username, email: $email, password: $password) {
            token
            user {
              _id
              username
              email
            }
          }
        }
      `,
      variables: { username, email, password },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.addUser;
};
