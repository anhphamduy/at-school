import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Row, Col, Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class ContentNotLoggedIn extends React.Component {
  state = {
    login: false,
  };

  render() {
    return (
      <div style={{ width: "100%"}}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ width: "100%"}}
        >
          <Menu.Item key="mail" style={{ textTransform: "capitalize", fontSize: "20px" }}>
            { this.props.mode }
          </Menu.Item>
        </Menu>
        <div
          style={{
            height: "100vh",
            width: "100%"
          }}
        >
          <Row>
            <Col span={1} />
            <Col span={22} style={{ marginTop: "5vh" }}>
              {this.props.mode == "login" ? <Login /> : <Register />}
            </Col>
            <Col span={1} />
          </Row>
        </div>
      </div>
    );
  }
}
