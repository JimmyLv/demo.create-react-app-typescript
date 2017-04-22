import fetch, { Response, RequestInfo, RequestInit } from 'dva/fetch'

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.message = response.body
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const request = async (url: RequestInfo, options?: RequestInit) => {
  const response: Response = await fetch(`http://localhost:3001${url}`, options)

  checkStatus(response)

  return {
    data: await response.json(),
    headers: {
      'x-total-count': response.headers.get('x-total-count')
    }
  }
}

export default request