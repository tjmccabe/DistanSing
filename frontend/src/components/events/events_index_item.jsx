import React from "react";


class EventIndexItem extends React.Component {
  render() {
    const { event } = this.props;
    return (
      // link to event show page?
      <div>
        {event.name}
        {event.date}
        {event.price}
      </div>
    )
  }
}

export default EventIndexItem;