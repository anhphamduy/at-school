import React from "react";
import { Layout } from "antd";

export default class NavContainer extends React.Component {
  state = {
    collapsed: true,
    disabledNavTeacher: true
  };

  render() {
    return (
      <Layout.Sider
        theme="light"
        onMouseOver={() => {
          this.setState({ collapsed: false, disabledNavTeacher: false });
        }}
        onMouseLeave={() => {
          this.setState({ collapsed: true, disabledNavTeacher: true });
        }}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{
          borderRightColor: "rgb(232, 232, 232)",
          borderRightWidth: "1px",
          borderRightStyle: "solid",
          height: "100vh",
          bottom: 0,
          top: 0,
          position: "fixed",
          zIndex: 100
        }}
      >
        {this.props.children}
      </Layout.Sider>
    );
  }
}
