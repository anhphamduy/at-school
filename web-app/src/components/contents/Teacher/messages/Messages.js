import React from "react";
import { Layout, Input, Avatar, Icon } from "antd";
import ListOfPeople from "./ListOfPeople";

import "./Message.css";

export default class Messages extends React.Component {
  render() {
    return (
      <Layout theme="light" style={{ backgroundColor: "white" }}>
        <ListOfPeople />
        <Layout.Content
          style={{
            position: "relative",
            marginTop: "5vh",
            marginLeft: "200px",
            height: "94.99vh",
            borderRight: "1px rgb(232, 232, 232) solid"
          }}
        >
          <ChatBox />
        </Layout.Content>
        <Layout.Sider
          className="bigSideBar"
          theme="light"
          style={{ marginTop: "5vh" }}
        >
          Rright sidebar
        </Layout.Sider>
      </Layout>
    );
  }
}

class ChatBox extends React.Component {
  state = {
    messages: [
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      },
      {
        content: "Hello I am here",
        self: false
      },
      {
        content: "Hello I am here",
        self: true
      }
    ]
  };

  handleSendMessage = message => {
    this.setState({
      messages: [...this.state.messages, { content: message, self: true }]
    });
  };

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

  componentDidUpdate() {
    console.log("Updates");
    this.scrollToBottom();
  }

  scrollToLast = () => {};

  render() {
    return (
      <div className="chatbox">
        <div className="chatlogs friend">
          {this.state.messages.map((message, key) => (
            <ChatMessage key={key} {...message} />
          ))}
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <ChatInput handleSendMessage={this.handleSendMessage} />
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
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px rgb(232, 232, 232) solid"
        }}
      >
        <Input.TextArea
          onChange={this.handleChangeText}
          placeholder="Type a message"
          value={this.state.value}
          style={{
            borderRadius: "0px",
            border: "0px",
            resize: "none",
            paddingRight: "30px",
          }}
          autosize={{ minRows: 2, maxRows: 4 }}
        />
        <Icon
          type="up-circle"
          style={{marginLeft: "-20px", paddingRight: "10px", zIndex: 1000, fontSize: 20}}
          onClick={() => {
            this.setState({ value: "" });
            this.props.handleSendMessage(this.state.value);
          }}
        />
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
