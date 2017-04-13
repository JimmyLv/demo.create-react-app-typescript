import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import Count from '../components/Count/Count'
import { Location } from 'history'

interface IndexPageProps {
  location: Location
}
function CountPage({ location }: IndexPageProps) {
  return (
    <MainLayout location={location}>
      <Count />
    </MainLayout>
  )
}

export default CountPage
