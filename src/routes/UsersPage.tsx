import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import Users from '../components/Users/Users'
import { Location } from 'history'

const CountPage: React.SFC<{
  location: Location
}> = ({ location }) => (
  <MainLayout location={location}>
    <Users />
  </MainLayout>
)

export default CountPage
