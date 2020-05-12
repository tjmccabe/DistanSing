import React from "react";
import EventsIndexItem from "./events_index_item";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        This is the Events Index that might be used by Splash, Artist Show, User Show
        {events.map( event => {
          return (
            <EventsIndexItem 
              key={event._id} 
              event={event} />
          )
        })}
      </div>
    )
  }
}

export default EventsIndex;