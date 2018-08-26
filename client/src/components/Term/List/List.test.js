import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import List from './List'

describe('component Term/List', () => {
  it('renders without crash', () => {
    shallow(
      <List terms={[]} />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <List terms={[]} />
    )
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
})
