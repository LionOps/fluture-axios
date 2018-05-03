import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fluaxios from '../'

const methodsWithNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

const testURL = 'example.com'

describe('Fluture-axios (fluaxios)', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  methodsWithNoData.concat(methodsWithData).forEach(method => {
    it(`calls the axios method ${method} and rejects on non-200`, done => {
      const assert = () => {
        expect(true).toBe(true)
      }

      mock.onAny().reply(500)

      fluaxios[method](testURL)
        .mapRej(assert)
        .done(done)
    })
  })
})
