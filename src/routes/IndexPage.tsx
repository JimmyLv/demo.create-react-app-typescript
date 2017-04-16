import * as React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import MainLayout from '../components/MainLayout/MainLayout'
import App from '../components/App/App'
import { Location } from 'history'

const Wrapper = styled.div`
  width: 900px;
  margin: 3em auto 0;
`

const IndexPage: React.SFC<{
  location: Location
}> = ({ location }) => (
  <MainLayout location={location}>
    <Wrapper>
      <App />
    </Wrapper>
  </MainLayout>
)

export default connect()(IndexPage)
