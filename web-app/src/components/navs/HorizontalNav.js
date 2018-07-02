import React from "react";
import { Menu, Layout } from "antd";

const HorizontalNav = props => {
  return (
    <Layout.Header
      style={{
        zIndex: 0,
        height: "5vh",
        maxHeight: "5vh",
        minHeight: "5vh",
        position: "fixed",
        background: "#fff",
        padding: 0,
        width: "100%"
      }}
    >
      <Menu
        style={{ height: "5vh", maxHeight: "5vh", minHeight: "5vh" }}
        mode="horizontal"
        selectedKeys={["0"]}
      >
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

export default HorizontalNav;
