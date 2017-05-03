import { Location } from 'history'
import * as React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import Story from '../components/Story/Story'

const StoryPage: React.SFC<{
  location: Location
}> = ({ location }) => (
  <MainLayout location={location}>
    <Story />
  </MainLayout>
)

export default StoryPage
