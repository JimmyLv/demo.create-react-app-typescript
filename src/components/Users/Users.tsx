import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import styled from 'styled-components'

import { AppState } from '../../models/appState'
import { Table } from 'antd'

const Wrapper = styled.div`
`

const Count: React.SFC<{
  list: Array<number>
  dispatch: Dispatch<AppState>
}> = ({ list: dataSource, dispatch }) => (
  <Wrapper>
    <Table />
  </Wrapper>
)

export default connect(
  (state: AppState) => ({ users: [1, 2, 3] })
)(Count)