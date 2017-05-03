import * as React from 'react'
import { injectGlobal } from 'styled-components'
import dva, { DvaInstance, RouterAPI } from 'dva'
import { message } from 'antd'
import * as createLoading from 'dva-loading'
import { Router, Route, useRouterHistory } from 'dva/router'
import { createHashHistory } from 'history'

import countModel from './models/count'
import usersModel from './models/users'
import { ERROR_MSG_DURATION } from './constants'
import IndexPage from './routes/IndexPage'
import CountPage from './routes/CountPage'
import UsersPage from './routes/UsersPage'

import 'antd/dist/antd.css'
import NotFoundPage from './routes/NotFoundPage'
import StoryPage from './routes/StoryPage'

/* tslint:disable */
injectGlobal`body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`
/* tslint:enable */

const app: DvaInstance = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(e: Error) {
    message.error(e.message, ERROR_MSG_DURATION)
  }
})

app.use(createLoading())

app.model(countModel)
app.model(usersModel)

app.router(({ history }: RouterAPI) => (
  <Router history={history}>
    <Route path="/" component={IndexPage} />
    <Route path="/count" component={CountPage} />
    <Route path="/users" component={UsersPage} />
    <Route path="/stories" component={StoryPage} />
    <Route path="/*" component={NotFoundPage} />
  </Router>
))

app.start('#root')
