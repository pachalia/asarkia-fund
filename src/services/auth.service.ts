import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH, I_AUTH } from '../GraphQl/auth'
import { CURRENT_USER, I_CURRENT_USER } from '../GraphQl/current-user'

export class AuthService {
  httpLink=createHttpLink({
    uri: 'https://andreypachalia.ru/api',
  });

  authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  client = new ApolloClient({
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache(),
  });

  auth (login: string, password:string) {
    return this.client.watchQuery<I_AUTH>({
      query: AUTH,
      variables: {
        auth: {
          login, password
        }
      },
      fetchPolicy: 'no-cache'
    })
  }

  currentUser(token:string) {
   return this.client.watchQuery<I_CURRENT_USER>({
      query: CURRENT_USER,
      variables: {
        token
      },
      fetchPolicy: 'no-cache'
    })
  }
}