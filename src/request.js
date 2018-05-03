import axios from 'axios'
import Future from 'fluture'

const { CancelToken } = axios

const request = (config) => {
  if (typeof config === 'string') {
    config = Object.assign({ url: config }, arguments[1])
  }

  let cancel

  return Future((reject, resolve) => {
    const cancelToken = new CancelToken(c => { cancel = c })
    axios.request({ ...config, cancelToken })
      .then(resolve)
      .catch(reject)

    return cancel.bind(cancel, 'Future canceled')
  })
}

export default request
