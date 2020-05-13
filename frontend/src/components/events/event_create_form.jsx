import React from 'react'
import ImageUpload from '../image_upload/image_upload';

export default class EventCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '0.00',
      date: '',
      imageurl: '',
      imagefile: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
    this.handleMinutes = this.handleMinutes.bind(this);
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
    const { name, description, price, date, imagefile } = this.state;
    if (imagefile) formData.append('imagefile', imagefile);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('date', date);
    return formData;
  }

  handleCancel() {
    this.setState({
      name: '',
      description: '',
      price: 0.00,
      date: '',
      imageurl: '',
      imagefile: null
    })
  }

  render() {
    const { name, description, price, date } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <ImageUpload setImageFile={this.setImageFile} imageurl='' />
        </div>
        <div>
          <label>Event Name
            <input type="text" value={name} onChange={this.handleInput("name")} />
          </label>
          <label>Description
            <textarea value={description} onChange={this.handleInput("description")} placeholder="What's going on?" />
          </label>
          <label>Ticket Price
            <input type="number" className="event-price-input" value={price} onChange={this.handleInput("price")} min="0.00" max="1000.00" step="0.01" />
          </label>
          <label>Date
            <input type="datetime-local" value={date} onChange={this.handleInput("date")} />
            {/* <div>
              <input type="number" min="1" max="12" />
              <span>:</span>
              <input type="number" onClick={this.handleMinutes} min="0" max="59" />
              <select>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div> */}
          </label>
        </div>
        <button>Save Changes</button>
        <div onClick={this.handleCancel}>Cancel</div>
      </form>
    )
  }
}