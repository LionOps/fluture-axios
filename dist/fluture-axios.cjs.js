'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var Future = _interopDefault(require('fluture'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _arguments = arguments;

const { CancelToken } = axios;

const request = config => {
  if (typeof config === 'string') {
    config = Object.assign({ url: config }, _arguments[1]);
  }

  let cancel;

  return Future((reject, resolve) => {
    const cancelToken = new CancelToken(c => {
      cancel = c;
    });
    axios.request(_extends({}, config, { cancelToken })).then(resolve).catch(reject);

    return cancel.bind(cancel, 'Future canceled');
  });
};

const fluxios = request;
fluxios.request = request;

const methodsWithNoData = ['delete', 'get', 'head', 'options'];
const methodsWithData = ['post', 'put', 'patch'];

methodsWithNoData.forEach(method => {
  fluxios[method] = (url, config = {}) => fluxios.request(Object.assign({}, config, { method, url }));
});

methodsWithData.forEach(method => {
  fluxios[method] = (url, data, config = {}) => fluxios.request(Object.assign({}, config, { data, method, url }));
});

module.exports = fluxios;
