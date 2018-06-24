import React from "react";
import { CSSTransition } from "react-transition-group";
import { Menu, Layout } from "antd";
import ContentContainer from "../ContentContainer";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import "../../../animations/slideUpDown.css";

export default class ContentNotLoggedIn extends React.Component {
  state = {
    login: false
  };

  render() {
    return (
      <Layout
        style={{
          marginLeft: 80,
        }}
      >
        <HorizontalNav current={this.props.current} mode={this.props.mode} />
        <ContentContainer>
          <ActualContent
            changeUserType={this.props.changeUserType}
            animation={this.props.animation}
            mode={this.props.mode}
            changeMode={this.props.changeMode}
            changeAnimation={this.props.changeAnimation}
            changeLoading={this.props.changeLoading}
          />
        </ContentContainer>
      </Layout>
    );
  }
}

const HorizontalNav = props => {
  return (
    <Layout.Header style={{ background: "#fff", padding: 0 }}>
      <Menu selectedKeys={[props.current]} mode="horizontal">
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

class ActualContent extends React.Component {
  changeFinishedLoginAnimation = () => {
    this.setState({
      finishedLoginAnimation: !this.state.finishedLoginAnimation
    });
  };

  render() {
    return (
      <div>
        <CSSTransition
          in={
            this.props.mode === "login" &&
            this.props.animation.finishedRegisterAnimation
          }
          timeout={300}
          classNames="slideUpDown"
          unmountOnExit
          onExited={() => {
            this.props.changeAnimation();
          }}
        >
          <Login
            changeLoading={this.props.changeLoading}
            changeUserType={this.props.changeUserType}
          />
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
          classNames="slideUpDown"
          onExited={() => {
            this.props.changeAnimation();
          }}
        >
          <Register
            changeLoading={this.props.changeLoading}
            changeMode={this.props.changeMode}
          />
        </CSSTransition>
      </div>
    );
  }
}
