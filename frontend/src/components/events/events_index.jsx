import React from "react";
import ShowEventItem from "../artists/show_event_item";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <div className="event-index">
        {events.map( event => {
          return (
            <ShowEventItem 
              key={event._id}
              event={event}
            />
          )
        })}
      </div>
    )
  }
}

export default EventsIndex;