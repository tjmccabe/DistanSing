import React from "react";
import { withRouter } from "react-router-dom";

class EventIndexItem extends React.Component {
  
  render() {
    const { event } = this.props;
    return (
      // link to event show page?
      <div onClick={() => this.props.history.push(`/events/${event._id}`)}>
        {event.name}
        {event.date}
        {event.price}
      </div>
    )
  }
}

export default withRouter(EventIndexItem);