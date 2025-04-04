import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Your back-end GraphQL API URL
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
