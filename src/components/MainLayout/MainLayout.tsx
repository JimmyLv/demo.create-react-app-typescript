import * as React from 'react'
import styled from 'styled-components'
import Header from './Header'
import { Location } from 'history'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Content = styled.div`
  flex: 1;
  display: flex;
`
const Main = styled.div`
  padding: 0 8px;
  flex: 1 0 auto;
`

interface MainLayoutProps {
  children?: React.ReactElement<{}>
  location: Location
}

function MainLayout({ children, location }: MainLayoutProps) {
  return (
    <Wrapper>
      <Header location={location} />
      <Content>
        <Main>
          {children}
        </Main>
      </Content>
    </Wrapper>
  )
}

export default MainLayout
