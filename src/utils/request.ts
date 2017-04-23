import { RequestInfo, RequestInit } from 'dva/fetch'
import { BASE_URL } from '../constants'

// tslint:disable-next-line
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.message = response.body
  throw error
}

const request = async (url: RequestInfo, options?: RequestInit) => {
  const response = await fetch(BASE_URL + url, options)

  checkStatus(response)

  return {
    data: await response.json(),
    headers: {
      'x-total-count': response.headers.get('x-total-count')
    }
  }
}

export default request