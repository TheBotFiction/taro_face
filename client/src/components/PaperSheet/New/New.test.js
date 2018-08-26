import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import New from './New'

const noop = () => {}

describe('component Term/Show', () => {
  it('renders without crash', () => {
    shallow(
      <New loadOptions={noop} onSelectTerm={noop} previewSlot={<span />} />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <New loadOptions={noop} onSelectTerm={noop} previewSlot={<span />} />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})