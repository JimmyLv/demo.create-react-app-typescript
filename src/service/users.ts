import request from '../utils/request'
import { PAGE_SIZE } from '../constants'

export function retrieve({ page = 1 }: { page: number }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`)
}