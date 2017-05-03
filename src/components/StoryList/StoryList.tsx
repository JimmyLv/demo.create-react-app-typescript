import * as React from 'react'
// FlipMove for list animations
import * as FlipMove from 'react-flip-move'

import StoryItem, { StoryModel } from '../StoryItem/StoryItem'

const StoryList: React.SFC<{
  stories: Array<StoryModel>
  handleEdit: Function
  handleDelete: Function
}> = ({ stories, handleEdit, handleDelete }) => (
  <div className="StoryList clearfix">
    <FlipMove duration={350} easing="ease-in-out" enterAnimation="accordionHorizontal">
      <div>
        {stories.map((story, index) => (
          <StoryItem
            key={index}
            story={story}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </FlipMove>
  </div>
)

export default StoryList