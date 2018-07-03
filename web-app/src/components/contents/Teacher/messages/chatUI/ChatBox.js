import React from "react";
import { Icon, Input, Avatar } from "antd";

export default class ChatBox extends React.Component {

  scrollToBottom = () => {
    console.log("Here")
    this.messagesEnd.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest"
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.messages.length != nextProps.messages.length || this.props.personInfo != nextProps.personInfo) {
      return true
    }
    return false
  }


  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="chat-name">
          {this.props.personInfo
            ? this.props.personInfo.fullname
            : "hello"}
        </div>
        <div
          className="chatbox"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1
          }}
        >
          <div className="chatlogs friend">
            {this.props.messages.map((message, key) => (
              <ChatMessage key={key} {...message} />
            ))}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <ChatInput handleSendMessage={this.props.handleSendMessage} scrollToBottom={this.scrollToBottom} />
        </div>
      </div>
    );
  }
}

class ChatInput extends React.Component {
  state = {
    value: ""
  };

  handleChangeText = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div style={{ flex: "1" }}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px rgb(232, 232, 232) solid",
            height: "100%"
          }}
          className="message-container"
        >
          <Input.TextArea
            onChange={this.handleChangeText}
            placeholder="Type a message"
            value={this.state.value}
            style={{
              borderRadius: "0px",
              border: "0px",
              resize: "none",
              paddingBottom: 0,
              paddingTop: 0,
              minHeight: "100%",
              maxHeight: "100%"
            }}
            autosize={{ minRows: 4, maxRows: 6 }}
          />
          <Icon
            type="up-circle"
            style={{
              zIndex: 1000,
              fontSize: 20
            }}
            onClick={() => {
              this.setState({ value: "" });
              this.props.handleSendMessage(this.state.value);
            }}
          />
        </div>
      </div>
    );
  }
}

const ChatMessage = props => {
  const className = "chat" + (props.self ? " self" : "");
  return (
    <div className={className}>
      {!props.self ? (
        <Avatar
          style={{ zIndex: 500 }}
          shape="circle"
          className="user-photo"
          icon="user"
        />
      ) : null}
      <p style={{ zIndex: 500 }} className="chat-message">
        {props.content}
      </p>
    </div>
  );
};
