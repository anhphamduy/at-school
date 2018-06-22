import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Row, Col, Menu, Layout } from "antd";
import { CSSTransition } from "react-transition-group";
import "./animation.css"

const { Header, Content } = Layout;

export default class ContentNotLoggedIn extends React.Component {
  state = {
    login: false
  };

  render() {
    return (
      <Layout>
        <HorizontalNav current={this.props.current} mode={this.props.mode} />
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
                <ActualContent
                  changeUserType={this.props.changeUserType}
                  animation={this.props.animation}
                  mode={this.props.mode}
                  changeMode={this.props.changeMode}
                  changeAnimation={this.props.changeAnimation}
                />
              </Col>
              <Col span={1} />
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

const HorizontalNav = props => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Menu selectedKeys={[props.current]} mode="horizontal">
        <Menu.Item
          key="1"
          style={{ textTransform: "capitalize", fontSize: "20px" }}
        >
          {props.mode}
        </Menu.Item>
      </Menu>
    </Header>
  );
};

class ActualContent extends React.Component {
  changeFinishedLoginAnimation = () => {
    this.setState({
      finishedLoginAnimation: !this.state.finishedLoginAnimation
    });
  };

  render() {
    // return this.props.mode === "login" ? (
    //   <Login />
    // ) : (
    //   <Register changeMode={this.props.changeMode} />
    // );
    return (
      <div>
        <CSSTransition
          in={
            this.props.mode === "login" &&
            this.props.animation.finishedRegisterAnimation
          }
          timeout={300}
          classNames="message"
          unmountOnExit
          onExited={() => {
            this.props.changeAnimation();
          }}
        >
          <Login changeUserType={this.props.changeUserType}/>
        </CSSTransition>
        <CSSTransition
          in={
            this.props.mode === "register" &&
            this.props.animation.finishedLoginAnimation
          }
          transitionAppear={true}
          transitionLeave={true}
          timeout={300}
          unmountOnExit
          classNames="message"
          onExited={() => {
            this.props.changeAnimation();
          }}
        >
          <Register changeMode={this.props.changeMode} />
        </CSSTransition>
      </div>
    );
  }
}
