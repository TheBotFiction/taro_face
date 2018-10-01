import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App />)
});
