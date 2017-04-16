import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import styled from 'styled-components'

import { CountState } from '../../models/count'
import { AppState } from '../../models/appState'

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

const Count: React.SFC<{
  count: CountState
  dispatch: Dispatch<AppState>
}> = ({ count, dispatch }) => (
  <Wrapper>
    <Record>Highest Record: {count.record}</Record>
    <Current>{count.current}</Current>
    <StyledButton>
      <Button onClick={() => dispatch({ type: 'count/add' })}>+</Button>
    </StyledButton>
  </Wrapper>
)

export default connect(
  (state: AppState) => ({ count: state.count, number: 1 })
)(Count)