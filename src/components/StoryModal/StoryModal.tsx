import * as React from 'react'
import * as Modal from 'react-modal'
import { StoryModel } from '../StoryItem/StoryItem'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class StoryModal extends React.Component<{
  story: StoryModel
  modalIsOpen: boolean
  closeModal: Function
}, StoryModel> {
  // Internal state
  state = {
    author: '',
    content: ''
  }

  handleInputChange = (e) => {
    // Re-binding author and content values
    if (e.target.id === 'author') {
      this.setState({ author: e.target.value })
    }
    if (e.target.id === 'content') {
      this.setState({ content: e.target.value })
    }
  }

  handleSubmit = (e) => {
    const { author, content } = this.state
    this.props.closeModal({ author, content })
    e.preventDefault()
  }

  cancelSubmit = (e) => {
    this.setState({
      author: '',
      content: ''
    })
    this.props.closeModal()
    e.preventDefault()
  }

  componentWillReceiveProps({ story }: { story: StoryModel }) {
    // Update story state anytime
    // a new props is passed to the Modal
    // This is handy because the component
    // is never destroyed but it's props might change
    this.setState(story)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.cancelSubmit}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Story Modal"
      >
        <div className="Modal">
          <h4 className="text-center">Story Form</h4>
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  id="author"
                  type="text"
                  value={this.state.author}
                  onChange={(e) => this.handleInputChange(e)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  id="content"
                  value={this.state.content}
                  onChange={(e) => this.handleInputChange(e)}
                  cols={30}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Save" className="ModalButton" />
                <button
                  className="ModalButton ModalButton--close"
                  onClick={this.cancelSubmit}
                >Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}

export default StoryModal
