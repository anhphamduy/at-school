import React from "react";
import { Layout, Avatar } from "antd";
import ListOfPeople from "./ListOfPeople";
import ChatBox from "./chatUI/ChatBox";

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
            height: "95vh",
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
