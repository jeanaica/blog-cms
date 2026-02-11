import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from 'lib/auth/getAuthToken';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

// Set the authorization header using the token from session storage:
const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const removeTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: any) =>
      key === '__typename' ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        meta: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: from([removeTypenameLink, authLink, httpLink]),
  cache,
});

export default client;
