import React from "react";
import { Menu, Icon } from "antd";
import NavContainer from "../NavContainer";
import SchoolLogo from "../SchoolLogo";
import "antd/dist/antd.css";
import "./Navs.css";

export default class NavNotLoggedIn extends React.Component {
  _changeMode = item => {
    if (item.key === "1") {
      return "login";
    }
    return "register";
  };

  changeMenuSelection = menuKey => {
    this.setState({
      selectedKeys: [menuKey]
    });
  };

  render() {
    return (
      <NavContainer changeLayoutMarginLeft={this.props.changeLayoutMarginLeft}>
        <SchoolLogo />
        <hr
          style={{
            margin: "20px",
            borderColor: "hsla(0,0%,100%,.5)",
            borderWidth: "0.2"
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          onClick={item => {
            this.changeMenuSelection(item.key);
            this.props.changeMode(this._changeMode(item));
          }}
          selectedKeys={this.props.mode === "login" ? ["1"] : ["2"]}
        >
          <Menu.Item key="1">
            <Icon type="login" />
            <span>Log In</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user-add" />
            <span>Register</span>
          </Menu.Item>
        </Menu>
      </NavContainer>
    );
  }
}
