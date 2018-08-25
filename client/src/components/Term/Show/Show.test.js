import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Show from './Show'

describe('component Term/Show', () => {
  it('renders without crash', () => {
    shallow(
      <Show term={{}} />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <Show term={{}} />
    )
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
})