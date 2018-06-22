import React from "react";
import { Layout } from "antd";
import NavNotLoggedIn from "./navs/NotLoggedIn/NavNotLoggedIn";
import ContentNotLoggedIn from "./contents/NotLoggedIn/ContentNotLoggedIn";

export default class AppNotLoggedIn extends React.Component {
  state = {
    login: false,
    mode: "login",
    animation: {
      navNotLoggedIn: {
        finishedLoginAnimation: true,
        finishedRegisterAnimation: true
      }
    }
  };

  changeAuthAnimation = () => {
    this.setState({
      animation: {
        navNotLoggedIn: {
          finishedLoginAnimation: true,
          finishedRegisterAnimation: true
        }
      }
    });
  };

  _changeModeNotLoggedIn = mode => {
    if (mode === "register") {
      this.setState({
        animation: {
          navNotLoggedIn: {
            finishedLoginAnimation: false,
            finishedRegisterAnimation: true
          }
        }
      });
    } else if (mode === "login") {
      this.setState({
        animation: {
          navNotLoggedIn: {
            finishedLoginAnimation: true,
            finishedRegisterAnimation: false
          }
        }
      });
    }

    this.setState({ mode });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100%" }}>
          <NavNotLoggedIn
            mode={this.state.mode}
            changeMode={this._changeModeNotLoggedIn}
          />
          <Layout>
            <ContentNotLoggedIn
              changeUserType={this.props.changeUserType}
              changeMode={this._changeModeNotLoggedIn}
              mode={this.state.mode}
              animation={this.state.animation.navNotLoggedIn}
              changeAnimation={this.changeAuthAnimation}
              changeLoading={this.props.changeLoading}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}
