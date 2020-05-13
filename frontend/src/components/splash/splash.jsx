import React from 'react';
import EventsIndexContainer from "../events/events_index_container";


class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    return(
      <div className='splash'>
        <div>
          Welcome To DistanSing
          <EventsIndexContainer />
        </div>
      </div>
    )
  }
}

export default Splash;