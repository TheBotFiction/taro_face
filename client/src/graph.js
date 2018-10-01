/**
 * @flow
 */
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import { firebase } from 'Auth'

const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql'

const cache: InMemoryCache = new InMemoryCache()

const request = async (operation) => {
  const idToken = await firebase.auth().currentUser.getIdToken()
  operation.setContext({
    headers: {
      authorization: `Bearer ${idToken}`
    }
  })
}

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle
    Promise.resolve(operation)
      .then(request)
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) handle.unsubscribe()
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        // logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected }});
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: 'include'
    })
  ]),
  cache
})

export default client