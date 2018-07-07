import React from "react";
import { Layout, Avatar } from "antd";
import ListOfPeople from "./ListOfPeople";
import ChatBox from "./chatUI/ChatBox";
import RightSiderPersonInfo from "./chatUI/RightSiderPersonInfo";
import { getMessageDetails, sendMessage } from "../../../../api/message";
import { AppContext } from "../../../../App";

import "./Message.css";

class Messages extends React.Component {
  state = {
    messages: []
  };

  // assign other person into the state, also get all messages between the user and other person
  getPersonInfo = async (personInfo, callback = () => {}) => {
    if (personInfo) {
      try {
        const messages = await getMessageDetails(
          this.props.userInfo.token,
          personInfo.id
        );
        this.setState(
          { personInfo, messages: await messages.results },
          callback()
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleSendMessage = async (message, callback = () => {}) => {
    try {
      if (message) {
        sendMessage(
          this.props.userInfo.token,
          this.state.personInfo.id,
          message
        ).then(() => callback());
      }
    } catch (err) {
      console.log(err);
    }
  };

  updateNewMessage = () => {
    this.updateMessageInterval = setInterval(() => {
      this.getPersonInfo(this.state.personInfo);
    }, 150);
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
        <ChatBox
          handleSendMessage={this.handleSendMessage}
          personInfo={this.state.personInfo}
          messages={this.state.messages}
        />
        <RightSiderPersonInfo personInfo={this.state.personInfo} />
      </Layout>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {values => <Messages {...props} {...values} />}
  </AppContext.Consumer>
);
