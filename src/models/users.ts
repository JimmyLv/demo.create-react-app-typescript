import { EffectsCommandMap, Model, SubscriptionAPI } from 'dva'
import { FSA } from 'flux-standard-action'
import { retrieve } from '../service/users'
import { Location } from 'history'

interface User {
  id: number
  name: string
  username: string
  email: string
  website: string
}

export declare interface UsersState {
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
    *fetch({ payload: { page = 1 } }: FSA<{ page: number }, {}>, { call, put }: EffectsCommandMap) {
      const { data, headers } = yield call(retrieve, { page })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page
        }
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }: SubscriptionAPI) {
      return history.listen((location: Location) => {
        const { pathname, query } = location
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query })
        }
      })
    }
  }
}

export default users