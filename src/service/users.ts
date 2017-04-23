import request from '../utils/request'
import { PAGE_SIZE } from '../constants'
import { User } from '../models/users'

export function retrieve({ page = 1 }: { page: number }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`)
}

export function create(values: User) {
  return request(`/api/users`, {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function patch(id: number, values: User) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  })
}

export function remove(id: number) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  })
}