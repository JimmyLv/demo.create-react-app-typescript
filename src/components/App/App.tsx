import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from 'antd'
import { BASE_URL } from '../../constants'

const Wrapper = styled.div`
  text-align: ${(props: { center: boolean }) => props.center ? 'center' : 'left'};
`
const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const Logo = styled.img`
  animation: ${spin} infinite 20s linear;
  width: 100px;
  height: 80px;
  background: url('./assets/logo.svg') no-repeat;
`
const Intro = styled.p`
  font-size: large;
`
const StyledButton = styled(Button)`
  margin: 0.5em;
`

const App: React.SFC<{}> = () => (
  <Wrapper center={true}>
    <Header>
      <Logo alt="logo" />
      <h2>Welcome to React</h2>
    </Header>
    <StyledButton
      type="primary"
      onClick={() => alert(`Current api: ${BASE_URL}`)}
    >
      Button
    </StyledButton>
    <Intro>
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </Intro>
  </Wrapper>
)

export default App
