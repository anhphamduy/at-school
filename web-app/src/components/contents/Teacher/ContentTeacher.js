import React from "react";
import { Menu, Layout } from "antd";
import ContentContainer from "../ContentContainer";
import Messages from "./messages/Messages";

export default class ContentTeacher extends React.Component {
  state = {
    marginLeft: 80
  };

  render() {
    return (
      <Layout
        style={{
          marginLeft: this.props.layoutMarginLeft,
          transition: "margin .2s"
        }}
      >
        <HorizontalNav mode={"Login"} />
        <ContentContainer noGrid={true}>
          {this.props.currentMenu === "5" ? <Messages /> : "Fuck You"}
        </ContentContainer>
      </Layout>
    );
  }
}

const HorizontalNav = props => {
  return (
    <Layout.Header style={{ height: "5vh", maxHeight: "5vh", minHeight: "5vh", position: "fixed", background: "#fff", padding: 0, width: "100%" }}>
      <Menu style={{ height: "5vh", maxHeight: "5vh", minHeight: "5vh" }} mode="horizontal" selectedKeys={["0"]}>
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
