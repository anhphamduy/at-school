import React from "react";
import { Menu, Layout } from "antd";
import ContentContainer from "../ContentContainer";
import Messages from "./messages/Messages"

export default class ContentTeacher extends React.Component {
  state = {
  };

  render() {
    return (
      <Layout>
        <HorizontalNav mode={"Login"} />
        <ContentContainer>
          
          {this.props.currentMenu === "5" ? <Messages /> : "Fuck You"}
        </ContentContainer>
      </Layout>
    );
  }
}

const HorizontalNav = props => {
  return (
    <Layout.Header style={{ background: "#fff", padding: 0 }}>
      <Menu mode="horizontal" selectedKeys={["0"]}>
        <Menu.Item
          key="1"
          style={{ textTransform: "capitalize", fontSize: "20px" }}
        >
          {props.mode}
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};
