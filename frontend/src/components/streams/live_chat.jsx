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
    this.handleEmoji = this.handleEmoji.bind(this);
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

  handleEmoji(e) {
    let newMsg = this.state.draft + e.target.innerText;
    this.setState({ draft: newMsg });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="stream-chat-box">
        <div id="messages-container">
          {messages.map((payload, idx) => {
            return (
              <div 
                className="stream-message"
                key={idx}
              >
                <div className="stream-name">{`${payload.name}:`}</div>
                <div className="stream-msg">{payload.message}</div>
              </div>
            )
          })}
        </div>
        <form 
          onSubmit={this.handleSend}
          className="stream-chat"
        >
          <div className="stream-chat-container">
            <input
              onChange={this.handleInput} 
              value={this.state.draft} 
              placeholder="Send a message"
              id="message-field" 
              type="text"/>
            <button>Send</button>
          </div>
        </form>
        <div className="stream-emojis">
          <div onClick={this.handleEmoji} className="stream-emoji">
            😀
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            😟
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            😍
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            👍🏼
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            👎🏼
          </div>
        </div>
      </div>
    )
  }
}