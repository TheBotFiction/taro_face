import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import New from './New'

const noop = () => {}
const EmptyNode = <span />

describe('component Term/New', () => {
  it('renders without crash', () => {
    shallow(
      <New
        loadOptions={noop}
        onSelectTerm={noop}
        onChooseQuestion={noop}
        onSubmit={noop}
        previewSlot={EmptyNode}
        chosenSlot={EmptyNode}
      />
    )
  })

  it('renders as expected', () => {
    const component = TestRenderer.create(
      <New
        loadOptions={noop}
        onSelectTerm={noop}
        onChooseQuestion={noop}
        onSubmit={noop}
        previewSlot={EmptyNode}
        chosenSlot={EmptyNode}
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})