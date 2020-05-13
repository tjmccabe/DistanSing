import React from 'react'
import ImageUpload from '../image_upload/image_upload';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';
import CurrencyInput from 'react-currency-input';

export default class EventCreateForm extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let time = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    this.state = {
      name: "",
      description: "",
      price: "0.00",
      date: date,
      time: time,
      imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/s_image_1-1589313843602.jpg",
      imagefile: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imagefile) {
    this.setState({ imagefile })
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.prepareForm();
    this.props.createEvent(data);
  }

  prepareForm() {
    const formData = new FormData();
    let { name, description, price, date, time, imagefile } = this.state;
    date = this.formatDate(date);
    let datetime = date + "T" + time;
    price = parseFloat(price.replace("$", ""));
    if (imagefile) formData.append("imagefile", imagefile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("date", datetime);
    return formData;
  }

  handleCancel() {
    this.props.history.goBack();
  }

  handleDate() {
    return date => this.setState({ date })
  }

  handleTime() {
    return time => this.setState({ time })
  }

  handlePrice() {
    return price => this.setState({ price })
  }

  formatDate(date) {
    const d = new Date(date)
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  renderErrors() {
    
    return this.props.errors[0] ? (
      <ul className="event-create-errors">
        {this.props.errors.map((error, idx) => {
          debugger;
          return (
            <li
              key={idx}>
              {error}
            </li>
          )
        })}
      </ul>
    ) : null;
  }

  render() {
    const { name, description, price, date, time, imageurl } = this.state;
    const ErrorList = this.renderErrors();
    return (
      <div className="event-create-page">
        <form className="event-create-form" onSubmit={this.handleSubmit}>
          <div className="event-create-left">
            <ImageUpload setImageFile={this.setImageFile} imageurl={imageurl} />
            <div className="event-date">
              <Calendar value={date} onChange={this.handleDate()} />
              <TimePicker className="" value={time} onChange={this.handleTime()} disableClock clearIcon={null} />
            </div>
          </div>
          <div className="event-create-right">
            <div className="event-inputs-container">
              <input className="event-name-field" type="text" value={name} onChange={this.handleInput("name")} placeholder="Event Name" />
              <div className="event-price-container">
                <span className="event-price-label">Price</span>
                <CurrencyInput className="event-price-field" onChange={this.handlePrice()} value={price} prefix="$"/>
              </div>
            </div>
            <textarea className="event-description-field" value={description} onChange={this.handleInput("description")} placeholder="Tell your fans about the event" />
            {ErrorList}
            <div className="event-create-btns">
              <button className="event-create-btn">Create Event</button>
              <button className="event-cancel-btn" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}