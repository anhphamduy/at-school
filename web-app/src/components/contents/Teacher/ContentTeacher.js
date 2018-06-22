import React from "react";
import { Menu, Layout } from "antd";
import ContentContainer from "../ContentContainer";

export default class ContentNotLoggedIn extends React.Component {
  state = {
    login: false
  };

  render() {
    return (
      <Layout>
        <HorizontalNav mode={"Login"} />
        <ContentContainer>
          Hello
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
