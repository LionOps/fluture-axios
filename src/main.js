import request from './request'

const fluxios = request
fluxios.request = request

const methodsWithNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

methodsWithNoData.forEach(method => {
  fluxios[method] = (url, config = {}) =>
    fluxios.request(Object.assign({}, config, { method, url }))
})

methodsWithData.forEach(method => {
  fluxios[method] = (url, data, config = {}) =>
    fluxios.request(Object.assign({}, config, { data, method, url }))
})

export default fluxios
