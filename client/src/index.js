/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './App'
import { TermShowContainer } from 'containers/Term'
import {
  PaperSheetNewContainer,
  PaperSheetShowContainer
} from 'containers/PaperSheet'

import registerServiceWorker from 'registerServiceWorker'

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
          <Route path='/terms/:id' component={TermShowContainer} />
          <Route path='/papersheets/new' component={PaperSheetNewContainer} />
          <Route path='/papersheets/:id' component={PaperSheetShowContainer} />
        </Switch>
      </Router>
    </ApolloProvider>,
    rootElement
  )
  registerServiceWorker()
}