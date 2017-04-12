import * as React from 'react'
import { Router, Route } from 'dva/router'
import styled, { injectGlobal } from 'styled-components'
import key from 'keymaster'

import dva, {
  connect,
  DvaInstance, EffectsCommandMap, RouterAPI, SubscriptionAPI
} from 'dva'

import { Action, Dispatch } from 'redux'
// import { FSA } from 'flux-standard-action'

import App from './App'

/* tslint:disable */
injectGlobal`body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`
/* tslint:enable */

const delay = (timeout: number) => new Promise<number>(resolve => setTimeout(resolve, timeout))

const app: DvaInstance = dva()

declare interface CountState {
  record: number
  current: number
}

declare interface AppState {
  count: CountState
}

const MINUS_TYPE: string = 'minus'
const ADD_TYPE: string = 'minus'

app.model({
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
})

declare interface CountProps {
  count: CountState
  dispatch: Dispatch<AppState>
}

const Wrapper = styled.div`
  width: 200px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 20px #ccc;
`

const Record = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  color: #ccc;
`

const Current = styled.div`
  text-align: center;
  font-size: 40px;
  padding: 40px 0;
`

const StyledButton = styled.div`
  text-align: center;
`

const Button = styled.button`
  width: 100px;
  height: 40px;
  background: #aaa;
  color: #fff;
`

const CountApp: React.StatelessComponent<CountProps> = ({ count, dispatch }) => {
  return (
    <Wrapper>
      <Record>Highest Record: {count.record}</Record>
      <Current>{count.current}</Current>
      <StyledButton>
        <Button onClick={() => dispatch({ type: 'count/add' })}>+</Button>
      </StyledButton>
    </Wrapper>
  )
}

const CountPage = connect(
  (state: AppState) => ({ count: state.count, number: 1 })
)(CountApp)

app.router(({ history }: RouterAPI) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/count" component={CountPage} />
  </Router>
)

app.start('#root')
