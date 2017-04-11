import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import App from './App'

/* tslint:disable */
injectGlobal`body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`
/* tslint:enable */

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
