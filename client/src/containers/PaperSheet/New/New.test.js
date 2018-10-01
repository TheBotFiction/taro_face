import React from 'react'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'
import * as queries from 'constants/queries'

import New from './New'

const mocks = [
  {
    request: {
      query: queries.INDEX_TERM_QUERY
    },
    result: {
      data: {
        terms: [{
          id: 1,
          term: 'Fake term 1',
          meaning: 'Fake meaning 1',
          reading: 'Fake reading 1',
          __typename: 'TermType'
        }]
      }
    }
  },
  {
    request: {
      query: queries.CREATE_PAPER_SHEET_MUTATION,
      variables: {
        questions: [
          {
            term: 'Fake term 2',
            phrase: 'Fake phrase 2',
            answers: [
              'Fake term 1',
              'Fake term 2',
              'Fake term 3',
              'Fake term 4'
            ]
          }
        ]
      }
    }
  }
]

describe('component Term/New', () => {
  it('renders without crash', () => {
    shallow(
      <MockedProvider mocks={mocks}>
        <New />
      </MockedProvider>
    )
  })

  it('renders as expected', async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks}>
        <New />
      </MockedProvider>
    )

    await wait(1000)

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
})