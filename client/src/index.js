/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import Loadable from 'react-loadable'
import { AuthProvider, ProtectedRoute } from 'Auth'
import graphClient from './graph'

import './index.css'
import PageLoadingComponent from 'components/PageLoadingComponent'

import registerServiceWorker from 'registerServiceWorker'

const App = Loadable({
  loader: () => import('./App'),
  loading: PageLoadingComponent
})
const SigninContainer = Loadable({
  loader: () => import('containers/Signin'),
  loading: PageLoadingComponent
})
const TermNewContainer = Loadable({
  loader: () => import('containers/Term/New'),
  loading: PageLoadingComponent
})
const TermShowContainer = Loadable({
  loader: () => import('containers/Term/Show'),
  loading: PageLoadingComponent
})
const PaperSheetNewContainer = Loadable({
  loader: () => import('containers/PaperSheet/New'),
  loading: PageLoadingComponent
})
const PaperSheetShowContainer = Loadable({
  loader: () => import('containers/PaperSheet/Show'),
  loading: PageLoadingComponent
})


const browserHistory: any = createBrowserHistory()

const rootElement: null | HTMLElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.render(
    <Router history={browserHistory}>
      <AuthProvider>
        <ApolloProvider client={graphClient}>
          <Switch>
            <Route path='/' component={App} exact />
            <Route path='/sign-in' component={SigninContainer} exact />
            <ProtectedRoute path='/terms/new' component={TermNewContainer} />
            <ProtectedRoute path='/terms/:id' component={TermShowContainer} />
            <ProtectedRoute path='/papersheets/new' component={PaperSheetNewContainer} />
            <ProtectedRoute path='/papersheets/:id' component={PaperSheetShowContainer} />
          </Switch>
        </ApolloProvider>
      </AuthProvider>
    </Router>,
    rootElement
  )
  registerServiceWorker()
}
