/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import asyncComponent from 'components/AsyncComponent'
import './index.css'

import registerServiceWorker from 'registerServiceWorker'

const App: Node = asyncComponent(() => import('./App'))
const PaperSheetNewContainer: Node = asyncComponent(() => import('containers/PaperSheet/New'))
const PaperSheetShowContainer: Node = asyncComponent(() => import('containers/PaperSheet/Show'))
const TermNewContainer: Node = asyncComponent(() => import('containers/Term/New'))
const TermShowContainer: Node = asyncComponent(() => import('containers/Term/Show'))

const client: ApolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

const browserHistory: any = createBrowserHistory()

const rootElement: null | HTMLElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router history={browserHistory}>
        <Switch>
          <Route path='/' component={App} exact />
          <Route path='/terms/new' component={TermNewContainer} exact />
          <Route path='/terms/:id' component={TermShowContainer} />
          <Route path='/papersheets/new' component={PaperSheetNewContainer} exact />
          <Route path='/papersheets/:id' component={PaperSheetShowContainer} />
        </Switch>
      </Router>
    </ApolloProvider>,
    rootElement
  )
  registerServiceWorker()
}