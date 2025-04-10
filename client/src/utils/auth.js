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
      variables: { email, password }, // Send email and password correctly
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
        mutation Signup($input: UserInput!) {
          addUser(input: $input) {
            token
            user {
              email
              username
            }
          }
        }
      `,
      variables: {
        input: { username, email, password }, // Wrap the values in a single input object
      },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.addUser;
};
