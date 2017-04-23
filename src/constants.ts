export const ERROR_MSG_DURATION: number = 3 // 3 秒
export const PAGE_SIZE: number = 3

// action type
export const MINUS_TYPE: string = 'minus'
export const ADD_TYPE: string = 'add'

export const BASE_URL = process.env.NODE_ENV === 'production' ?
  'http://jsonplaceholder.typicode.com/db' :
  'http://localhost:3001'