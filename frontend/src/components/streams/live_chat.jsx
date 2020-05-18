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
    this.scroll = this.scroll.bind(this);  
  }

  componentDidMount() {
    this.messageField = document.getElementById("message-field")
    this.messageBox = document.getElementById("messages-container")
    this.socket.on("chat", (message, name) => {
      const newMessages = this.state.messages.concat({ message, name })
      let cb = this.messageBox.scrollTop + this.messageBox.clientHeight === this.messageBox.scrollHeight ? (
        this.scroll
      ) : null

      this.setState({ messages: newMessages }, cb);
    })
  }

  scroll() {
    // logic to autoscroll to the bottom, but only if a user is already at the 
    // bottom of the chat window
    // debugger
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  handleSend(e) {
    e.preventDefault();
    const { currentUser } = this.props;
    const name = currentUser.username ? currentUser.username : currentUser.artistname 
    const message = this.messageField.value;
    this.socket.emit("chat", message, name);
    this.setState({ draft: "" })
  }

  handleInput(e) {
    this.setState({ draft: e.target.value })
  }

  handleEmoji(e) {
    let newMsg = this.state.draft + e.target.innerText;
    this.setState({ draft: newMsg });
    this.messageField.focus()
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
            <span role="img" aria-label="smiley">😀</span>
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            <span role="img" aria-label="worried">😟</span>
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            <span role="img" aria-label="heart-eyes">😍</span>
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            <span role="img" aria-label="thumbs-up">👍🏼</span>
          </div>
          <div onClick={this.handleEmoji} className="stream-emoji">
            <span role="img" aria-label="thumbs-down">👎🏼</span>
          </div>
        </div>
      </div>
    )
  }
}