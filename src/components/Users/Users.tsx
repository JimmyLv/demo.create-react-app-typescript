import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import styled from 'styled-components'

import { AppState } from '../../models/appState'

const Wrapper = styled.div`
`

const Count: React.SFC<{
  users: Array<number>
  dispatch: Dispatch<AppState>
}> = ({ users, dispatch }) => (
  <Wrapper>Hello Users</Wrapper>
)

export default connect(
  (state: AppState) => ({ users: [1, 2, 3] })
)(Count)