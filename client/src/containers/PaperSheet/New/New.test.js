import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import New from './New'

xdescribe('component Term/Show', () => {
  it('renders without crash', () => {
    shallow(
      <New />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <New />
    )
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
})