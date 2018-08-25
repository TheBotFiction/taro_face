import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Show from './Show'

// Technical debt: Mock the graphql for testing
// https://www.robinwieruch.de/react-apollo-client-testing/
xdescribe('component Term/Show', () => {
  it('renders without crash', () => {
    shallow(
      <Show
        match={{}}
       />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <Show
        match={{}}
       />
    )
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
})