import React from "react";
import { Layout } from "antd";

export default class NavContainer extends React.Component {
  state = {
    collapsed: true
  };

  _toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout.Sider 
        theme="light"
        onMouseOver={() => this.setState({collapsed: false})}
        onMouseLeave={() => this.setState({collapsed: true})}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{
          borderRightColor: "rgb(232, 232, 232)",
          borderRightWidth: "1px",
          borderRightStyle: "solid",
        }}
      ><div style={{position: "fixed"}}>
        {this.props.children}
        </div>
      </Layout.Sider>
    );
  }
}
