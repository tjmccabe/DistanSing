import React from 'react';
import { GoTrashcan } from "react-icons/go";

class DeleteEvent extends React.Component {
  constructor(props){
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { fetchArtist, deleteEvent, event } = this.props;
    deleteEvent(event._id)
      .then(()=> fetchArtist(event.artist) )
  }

  render() {
    return (
      <div className='delete-button-container' onClick={this.handleDelete}>
        <div className='delete-button'>
          <GoTrashcan />
        </div>
      </div>
    )
  }
}

export default DeleteEvent;