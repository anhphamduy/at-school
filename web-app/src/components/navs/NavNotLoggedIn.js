import React from "react";
import { Menu, Icon } from "antd";
import "antd/dist/antd.css";

export default class NavNotLoggedIn extends React.Component {
  state = {
  };

  render() {
    return (
      <Menu
        style={{
          width: "15%",
          minHeight: "100vh",
          position: "fixed"
        }}

        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        onClick={(item, key, path) => this.props.changeMode(item, key, path)}        
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            style={{
              width: "50px",
              marginTop: "3vh",
              marginBottom: "0.1vh"
            }}
            src="/gngc.png"
          />
        </div>
        <hr style={{ margin: "15px 35px 30px 35px", border: "0.5px solid rgba(0,0,0,.1)"}}/>
        <Menu.Item key="login">
          <Icon type="user" />
          Sign In
        </Menu.Item>
        <Menu.Item key="register">
          <Icon type="user-add"/>
          Register
        </Menu.Item>
      </Menu>
    );
  }
}
