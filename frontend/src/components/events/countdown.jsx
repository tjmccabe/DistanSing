import React from "react";
import { withRouter } from "react-router-dom";

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
              clearInterval(this.myInterval);
              // this.props.location.reload();
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

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const diff = new Date(this.props.date).getTime() - new Date().getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      // const minutes = 0;
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.setState({ days, hours, minutes, seconds });
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
      <div className="countdown-live-now">Live Now!</div>
    ) : (
      <div className="countdown-timer">
        <div className="countdown-timer-header">Time to Live:</div>
        <div className="countdown-time">
          <div className="countdown-time-days">
            <div className="countdown-days-value">
              <div className="test">
                {` ${days < 100 ? (days < 10 ? `00${days}` : `0${days}`) : days}`}
              </div>
            </div>
            <div className="countdown-time-text">day(s)</div>
          </div>

          <div className="countdown-time-hours">
            <div className="countdown-hours-value">
              {`${hours < 10 ? `0${hours}` : hours}`}
            </div>
            <div className="countdown-time-text">hour(s)</div>
          </div>

          <div className="countdown-time-minutes">
            <div className="countdown-minutes-value">
              {`${minutes < 10 ? `0${minutes}` : minutes}`}
            </div>
            <div className="countdown-time-text">minute(s)</div>
          </div>

          <div className="countdown-time-seconds">
            <div className="countdown-seconds-value">
              {`${seconds < 10 ? `0${seconds}` : seconds}`}
            </div>
            <div className="countdown-time-text">second(s)</div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default withRouter(Countdown);