import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fluaxios from '../'

const methodsWithNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

const testURL = 'example.com'

describe('Fluture-axios (fluaxios)', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios, { delayResponse: 2000 })
  })

  afterEach(() => {
    mock.reset()
  })

  methodsWithNoData.concat(methodsWithData).forEach(method => {
    it(`the cancel function cancels the request for method ${method}`, () => {
      const notCalled = jest.fn()

      mock.onAny().reply(200)

      const cancel = fluaxios[method](testURL)
        .map(notCalled)
        .fork(console.log, console.log)

      cancel()
      expect(notCalled).not.toHaveBeenCalled()
    })
  })
})
