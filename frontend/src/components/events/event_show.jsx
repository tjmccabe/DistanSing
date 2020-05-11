import React from "react";

class EventShow extends React.Component {
  render() {
    const { event } = this.props;
    return (
      <div>
        This is Event Show Page
        {event.name}
        {event.date}
        {event.price}
      </div>
    )
  }
}

export default EventShow;