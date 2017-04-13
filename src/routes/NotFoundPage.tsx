import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import NotFound from '../components/NotFound/NotFound'
import { Location } from 'history'

interface IndexPageProps {
  location: Location
}
function NotFoundPage({ location }: IndexPageProps) {
  return (
    <MainLayout location={location}>
      <NotFound />
    </MainLayout>
  )
}

export default NotFoundPage
