import React from "react";

class EventShow extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    const { event } = this.props;
    if (!event) return null;
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