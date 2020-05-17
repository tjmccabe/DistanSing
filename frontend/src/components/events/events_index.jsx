import React from "react";
import ShowEventItem from "../artists/show_event_item";

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;

    // this function gets all future events, sorts them by soonest,
    // and takes only the first 5
    const OnlyUpcoming = events[0] ? (
      events.filter(ev => (
        new Date(ev.date).getTime() > new Date().getTime()
      ))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
    ) : null

    return (
      <div className="event-index-container">
        <div className="event-index">
          {OnlyUpcoming.map( event => {
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