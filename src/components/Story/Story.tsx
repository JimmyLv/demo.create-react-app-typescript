import Axios from 'axios'
import * as React from 'react'
import StoryButton from '../StoryButton/StoryButton'
import { StoryModel } from '../StoryItem/StoryItem'
import StoryList from '../StoryList/StoryList'
import StoryModal from '../StoryModal/StoryModal'

class Story extends React.Component<{}, {
  modalIsOpen: boolean
  isLoading: boolean
  stories: Array<StoryModel>
  story: StoryModel
}> {
  apiUrl = 'https://wt-0935a9d9b358e4302704de1cca42649c-0.run.webtask.io/demo.serverless-mern/stories'
  state = {
    modalIsOpen: false,
    isLoading: false,
    stories: [],
    story: {
      author: '',
      content: '',
      _id: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    Axios.get(this.apiUrl)
      .then(({ data }) => {
        this.setState({
          stories: data,
          isLoading: false
        })
      })
  }

  openModal = (story) => {
    this.setState({ modalIsOpen: true })
    if (story) {
      this.setState({ story })
    }
  }

  closeModal = (model: StoryModel) => {
    this.setState({ modalIsOpen: false })
    if (model) {
      this.setState({ isLoading: true })
      if (!model._id) {
        Axios.post(this.apiUrl, model)
          .then(({ data }) => {
            this.setState({
              stories: [data, ...this.state.stories],
              isLoading: false
            })
          })
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model)
          .then(({ data }) => {
            const storyToUpdate = this.state.stories.find((x: StoryModel) => x._id === model._id)
            const newStories = this.state.stories.map((story: StoryModel) => {
              if (data._id === story._id) {
                return { storyToUpdate, ...data }
              }
              return story
            })
            console.info(newStories, [...this.state.stories, { ...data }])
            this.setState({
              stories: newStories,
              isLoading: true
            })
          })
      }
    }
    this.setState({
      story: {
        author: '',
        content: '',
        _id: ''
      }
    })
  }

  handleEdit = (id) => {
    this.openModal(this.state.stories.find((x: StoryModel) => x._id === id))
  }

  handleDelete = (id) => {
    this.setState({ isLoading: true })
    Axios.delete(`${this.apiUrl}?id=${id}`)
      .then(() => {
        const updatedStories = this.state.stories.findIndex((x: StoryModel) => x._id === id)
        this.setState({
          stories: [...this.state.stories.splice(updatedStories, 1)],
          isLoading: false
        })
      })
  }

  render() {

    return (
      <div className="App">
        <div className="col-md-4 col-md-offset-4 Story">
          <div className="StoryHeader">
            <h2>Stories</h2>
          </div>
          <StoryList
            stories={this.state.stories}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
          <div className="StoryFooter">
            <p>Thank you!</p>
          </div>
        </div>

        <StoryModal
          modalIsOpen={this.state.modalIsOpen}
          story={this.state.story}
          closeModal={this.closeModal}
        />
        <StoryButton handleClick={this.openModal} />
      </div>
    )
  }
}

export default Story