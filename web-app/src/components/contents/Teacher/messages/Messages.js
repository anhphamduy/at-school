import React from "react";
import { Layout, Avatar } from "antd";
import ListOfPeople from "./ListOfPeople";
import ChatBox from "./chatUI/ChatBox";
import { getMessageDetails, sendMessage } from "../../../../api/message";

import "./Message.css";

export default class Messages extends React.Component {
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

  // assign other person into the state, also get all messages between the user and other person
  getPersonInfo = async personInfo => {
    if (personInfo) {
      try {
        const messages = await getMessageDetails(this.props.userInfo.token, personInfo.id);
        this.setState({ personInfo, messages: await messages.results });
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleSendMessage = async message => {
    try {
      if (message) {
        sendMessage(this.props.userInfo.token, this.state.personInfo.id, message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  updateNewMessage = () => {
    this.updateMessageInterval = setInterval(() => {
      this.getPersonInfo(this.state.personInfo);
    }, 200);
  };

  componentWillMount() {
    this.updateNewMessage();
  }

  componentWillUnmount() {
    clearInterval(this.updateMessageInterval);
  }

  render() {
    return (
      <Layout theme="light" style={{ backgroundColor: "white" }}>
        <ListOfPeople {...this.props} getPersonInfo={this.getPersonInfo} />
        <Layout.Content
          style={{
            position: "relative",
            marginTop: "5vh",
            marginLeft: "200px",
            height: "95vh",
            borderRight: "1px rgb(232, 232, 232) solid"
          }}
        >
          <ChatBox
            handleSendMessage={this.handleSendMessage}
            personInfo={this.state.personInfo}
            messages={this.state.messages}
          />
        </Layout.Content>
        <Layout.Sider
          className="bigSideBar"
          theme="light"
          style={{ marginTop: "5vh" }}
        >
          <div style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingBottom: "5%",
                borderBottom: "1px rgb(232, 232, 232) solid"
              }}
            >
              <Avatar size="large" shape="circle" />
              <div
                style={{ marginLeft: "4%" }}
                className="right-side-bar-user-info"
              >
                <h3 style={{ marginBottom: 0 }}>Bill Pham</h3>
                <h5 style={{ marginBottom: 0 }}>CS student</h5>
              </div>
            </div>
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
}
