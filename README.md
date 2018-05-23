# fluture-axios

The [axios](https://github.com/axios/axios) you love, but better because it now returns a [fluture](https://github.com/fluture-js/Fluture).

## Installing

Using npm:

`$ npm install fluture-axios axios fluture`

Note that fluture-axios depends on axios and fluture as peer dependencies.

## Example

Performing a `GET` request

```js
// Create a future request for a user with a given ID

const userFuture = fluaxios.get('/user?ID=12345')
    
const cancel = userFuture.fork(console.error, console.log)
```

Note that `cancel` can be invoked to cancel the request in flight as an abstraction over axios's [cancellation](https://github.com/axios/axios#cancellation).

## API

Fluture-axios current supports the following methods from axios:

- **fluaxios#request(config)**
- **fluaxios#get(url[, config])**
- **fluaxios#delete(url[, config])**
- **fluaxios#head(url[, config])**
- **fluaxios#options(url[, config])**
- **fluaxios#post(url[, data[, config]])**
- **fluaxios#put(url[, data[, config]])**
- **fluaxios#patch(url[, data[, config]])**

The above methods will return a future for the request and once forked, will return a cancellation function.

* See [fluture](https://github.com/fluture-js/Fluture) to understand how to work with futures.
* See [axios](https://github.com/axios/axios) for more information about working with axios.
