import React from "react";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
        This is the Events Index
      </div>
    )
  }
}

export default EventsIndex;