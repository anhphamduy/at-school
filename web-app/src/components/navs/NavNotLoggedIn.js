import React from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import "./Navs.css";

const { Sider } = Layout;

export default class NavNotLoggedIn extends React.Component {
  state = {
    collapsed: true,
  };

  _toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  _changeMode = item => {
    if (item.key === "1") {
      return "login";
    }
    return "register";
  };

  changeMenuSelection = menuKey => {
    this.setState({
      selectedKeys: [menuKey]
    })
  }
  

  render() {
    return (
      <Sider
        theme="light"
        onMouseEnter={this._toggle}
        onMouseLeave={this._toggle}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{
          borderRightColor: "rgb(232, 232, 232)",
          borderRightWidth: "1px",
          borderRightStyle: "solid"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              alt="Gungahlin College logo"
              style={{
                width: "30px",
                marginTop: "3vh",
                marginBottom: "0.1vh"
              }}
              src="/gngc.png"
            />
          </div>
          <hr
            style={{
              margin: "20px",
              borderColor: "hsla(0,0%,100%,.5)",
              borderWidth: "0.2"
            }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          onClick={item => {
            this.changeMenuSelection(item.key)
            this.props.changeMode(this._changeMode(item));
          }}
          selectedKeys={this.props.mode === "login" ? ["1"] : ["2"]}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>Log In</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user-add" />
            <span>Register</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
