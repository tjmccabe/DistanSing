import React from 'react';

class ShowEventItem extends React.Component {
  

  render(){
    const {event} = this.props
    console.log(event)
    return (
      <div className="show-item">
        <figure></figure>
        <div className='item-details'>
          <div className="item-text">
            <h4>{event.name}</h4>
            <p>{event.description}</p>
          </div>
          <span>{event.price.toFixed(2)}</span>
        </div>

      </div>
    );
  }
}

export default ShowEventItem;
