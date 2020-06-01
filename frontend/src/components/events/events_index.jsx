import React from "react";
import ShowEventItem from "../artists/show_event_item";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;
    const upcomingEvents = events.filter( ev => (
      new Date(ev.date).getTime() > new Date().getTime()
    ))

    return (
      <div className="event-index-container">
        <div className="event-index">
          {upcomingEvents.map( event => {
            return (
              <ShowEventItem 
                key={event._id}
                event={event}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default EventsIndex;