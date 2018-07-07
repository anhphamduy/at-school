import React from "react";
import { Icon, Input, Avatar, Layout } from "antd";
import { getEmoji } from "../../../../../api/emojifier";
import { AppContext } from "../../../../../App";

export default class ChatBox extends React.Component {
  scrollToBottom = () => {
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
    if (
      this.props.messages.length != nextProps.messages.length ||
      this.props.personInfo != nextProps.personInfo
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <Layout.Content
        style={{
          position: "relative",
          marginTop: "5vh",
          marginLeft: "200px",
          height: "95vh",
          borderRight: "1px rgb(232, 232, 232) solid",
          width: "50%"
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div className="chat-name">
            {this.props.personInfo ? this.props.personInfo.fullname : "hello"}
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
            <AppContext.Consumer>
              {values => (
                <ChatInput
                  handleSendMessage={this.props.handleSendMessage}
                  scrollToBottom={this.scrollToBottom}
                  {...values}
                />
              )}
            </AppContext.Consumer>
          </div>
        </div>
      </Layout.Content>
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

  handleSendMessage = () => {
    this.props.handleSendMessage(this.state.value);
    this.setState({ value: "" });
  };

  handleGetEmoji = async () => {
    console.log(this.props);
    try {
      const data = await getEmoji(this.state.value, this.props.userInfo.token);
      const emojis = await Object.keys(data.emojis).reduce(
        (total, next) => total + data.emojis[next],
        ""
      );
      this.setState({value: this.state.value + emojis})
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
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
              paddingBottom: "10px",
              paddingTop: "10px"
            }}
            autosize={{ minRows: 1, maxRows: 3 }}
          />
          <ChatIcons
            handleGetEmoji={this.handleGetEmoji}
            handleSendMessage={() => this.handleSendMessage()}
          />
        </div>
      </div>
    );
  }
}

const ChatIcons = props => (
  <React.Fragment>
    <Icon
      type="smile-o"
      style={{
        zIndex: 1000,
        fontSize: 20,
        marginRight: 10
      }}
      onClick={() => {
        props.handleGetEmoji();
      }}
    />
    <Icon
      type="up-circle"
      style={{
        zIndex: 1000,
        fontSize: 20
      }}
      onClick={() => {
        props.handleSendMessage();
      }}
    />
  </React.Fragment>
);

const ChatMessage = props => {
  return (
    <div className={"chat" + (props.self ? " self" : "")}>
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
