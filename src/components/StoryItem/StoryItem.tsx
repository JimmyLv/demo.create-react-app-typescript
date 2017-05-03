import * as React from 'react'

export interface StoryModel {
  _id?: string
  author: string
  content: string
}

const StoryItem: React.SFC<{
  story: StoryModel
  handleEdit: Function
  handleDelete: Function
}> = ({ story, handleEdit, handleDelete }) => (
  <div className="StoryItem clearfix">
    <div className="col-sm-9 StoryItem__content">
      <h4>{story.author}</h4>
      <p>{story.content}</p>
    </div>
    <div className="col-sm-3 StoryItem__control">
      <span
        className="glyphicon glyphicon-edit"
        onClick={() => handleEdit(story._id)}
      />
      <span
        className="glyphicon glyphicon-remove"
        onClick={() => handleDelete(story._id)}
      />
    </div>
  </div>
)
export default StoryItem