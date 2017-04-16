import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import NotFound from '../components/NotFound/NotFound'
import { Location } from 'history'

const NotFoundPage: React.SFC<{
  location: Location
}> = ({ location }) => (
  <MainLayout location={location}>
    <NotFound />
  </MainLayout>
)

export default NotFoundPage
