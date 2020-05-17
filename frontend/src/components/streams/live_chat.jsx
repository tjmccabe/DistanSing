import React from 'react';

export default class LiveChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      draft: ''
    }
    this.socket = this.props.socket;
    this.handleInput = this.handleInput.bind(this);
    this.handleSend = this.handleSend.bind(this);  
  }

  componentDidMount() {
    this.socket.on("chat", (message, name) => {
      const newMessages = this.state.messages.concat({ message, name })
      this.setState({ messages: newMessages });
    })
  }

  handleSend(e) {
    e.preventDefault();
    const { currentUser } = this.props;
    const name = currentUser.username ? currentUser.username : currentUser.artistname 
    const message = document.getElementById("message-field").value;
    this.socket.emit("chat", message, name);
    this.setState({ draft: "" })
  }

  handleInput(e) {
    this.setState({ draft: e.target.value })
  }


  render() {
    const { messages } = this.state;
    return (
      <div className="stream-chat-box">
        <div id="messages-container">
          {messages.map((payload, idx) => {
            return (
              <div key={idx}>
                <div>{payload.name}:</div>
                <div>{payload.message}</div>
              </div>
            )
          })}
        </div>
        <form onSubmit={this.handleSend}>
          <input
            onChange={this.handleInput} 
            value={this.state.draft} 
            id="message-field" 
            type="text"/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}