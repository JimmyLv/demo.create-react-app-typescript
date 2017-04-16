import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import Count from '../components/Count/Count'
import { Location } from 'history'

const CountPage: React.SFC<{
  location: Location
}> = ({ location }) => (
  <MainLayout location={location}>
    <Count />
  </MainLayout>
)

export default CountPage
