import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// Set the authorization header using the token from session storage:
const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const sessionToken = window?.sessionStorage?.getItem('token');
    const token = sessionToken ? JSON.parse(sessionToken) : '';
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
  return {
    headers,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
