import { EffectsCommandMap, Model, SubscriptionAPI } from 'dva'
import { FSA } from 'flux-standard-action'

import * as usersService from '../service/users'
import { AppState } from './appState'

export interface User {
  id: number
  name: string
  username: string
  email: string
  website: string
}

export interface UsersState {
  list: Array<User>
  total: number
  page: number
}

const users: Model = {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(state: UsersState, action: FSA<{ data: Array<User>, page: number, total: number }, {}>) {
      const { payload: { data: list, total, page } } = action
      return { ...state, list, total, page }
    }
  },
  effects: {
    *fetch({ payload: { page = '1' } }: FSA<{ page: string }, {}>, { call, put }: EffectsCommandMap) {
      const { data, headers } = yield call(usersService.retrieve, { page })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10)
        }
      })
    },
    *remove({ payload: id }: FSA<number, {}>, { call, put }: EffectsCommandMap) {
      yield call(usersService.remove, id)
      yield put({ type: 'reload' })
    },
    *patch({ payload: { id, values } }: FSA<{ id: number, values: User }, {}>, { call, put }: EffectsCommandMap) {
      yield call(usersService.patch, id, values)
      yield put({ type: 'reload' })
    },
    *reload(action: FSA<{}, {}>, { put, select }: EffectsCommandMap) {
      const page = yield select((state: AppState) => state.users.page)
      yield put({ type: 'fetch', payload: { page } })
    }
  },
  subscriptions: {
    setup({ dispatch, history }: SubscriptionAPI) {
      return history.listen((location: { pathname: string, query: string }) => {
        const { pathname, query } = location
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query })
        }
      })
    }
  }
}

export default users