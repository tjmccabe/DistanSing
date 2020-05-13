import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    const diff = new Date(this.props.date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    // const minutes = 0;
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    this.state = { days, hours, minutes, seconds }
    // 4. Schedule the tick at 1 second intervals.
    // setInterval(this._tick.bind(this), 1000);
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { days, hours, seconds, minutes } = this.state
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              clearInterval(this.myInterval)
            } else {
              this.setState(({ days }) => ({
                days: days - 1,
                hours: 23
              }))
            }
          } else {
            this.setState(({ hours }) => ({
              hours: hours - 1,
              minutes: 59
            }))
          }
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {

  }

  render() {
    const { days, hours, minutes, seconds } = this.state
    return(
      <div>
        <div>
          {days === 0 && hours === 0 && minutes === 0 && seconds === 0
            ? <h1>Live Now!</h1>
          : <h1>Time to live: {days < 10 ? `0${days}`: days} days, {hours < 10 ? `0${hours}`: hours} hours, {minutes < 10 ? `0${minutes}`: minutes} minutes, {seconds < 10 ? `0${seconds}` : seconds} seconds</h1>
          }
        </div>
      </div>
    )
  }
  
}

export default Countdown;