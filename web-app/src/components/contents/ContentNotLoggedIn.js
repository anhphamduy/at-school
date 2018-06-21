import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Row, Col, Menu, Layout } from "antd";
const { Header, Content } = Layout;


export default class ContentNotLoggedIn extends React.Component {
  state = {
    login: false
  };

  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item
              key="1"
              style={{ textTransform: "capitalize", fontSize: "20px" }}
            >
              {this.props.mode}
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            background: "#fff"
          }}
        >
          <div
            style={{
              height: "100vh",
              width: "100%"
            }}
          >
            <Row>
              <Col span={1} />
              <Col span={22} style={{ marginTop: "5vh" }}>
                {this.props.mode === "login" ? (
                  <Login />
                ) : (
                  <Register changeMode={this.props.changeMode} />
                )}
              </Col>
              <Col span={1} />
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
