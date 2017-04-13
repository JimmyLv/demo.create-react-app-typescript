import * as key from 'keymaster'
import { Action } from 'redux'
import { EffectsCommandMap, Model, SubscriptionAPI } from 'dva'
import { ADD_TYPE, MINUS_TYPE } from '../constants'

const delay = (timeout: number) => new Promise<number>(resolve => setTimeout(resolve, timeout))

export declare interface CountState {
  record: number
  current: number
}

const countModel: Model = {
  namespace: 'count',
  state: {
    record: 0,
    current: 0
  },
  reducers: {
    [ADD_TYPE](state: CountState) {
      const newCurrent = state.current + 1
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent
      }
    },
    [MINUS_TYPE](state: CountState) {
      return {
        ...state,
        current: state.current - 1
      }
    }
  },
  effects: {
    *add(action: Action, { call, put }: EffectsCommandMap) {
      yield call(delay, 1000)
      yield put({ type: MINUS_TYPE })
    }
  },
  subscriptions: {
    keyboardWatcher({ dispatch }: SubscriptionAPI) {
      key('⌘+up, ctrl+up', () => {
        dispatch({ type: ADD_TYPE })
      })
    }
  }
}

export default countModel