import React from "react";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        This is the Events Index
        {events.map( event => {
          return (
            <div>
              {event.name}
            </div>
          )
        })}
      </div>
    )
  }
}

export default EventsIndex;