import React, { Component } from "react";
import { Layout } from "antd";
import NavNotLoggedIn from "./components/navs/NavNotLoggedIn";
import ContentNotLoggedIn from "./components/contents/ContentNotLoggedIn";

class App extends Component {
  state = {
    user: "anomynous",
    token: ""
  };

  changeUserType = (type, token) => {
    this.setState({ user: type, token });
    console.log(token)
  };

  render() {
    if (this.state.user === "anomynous") {
      return <AppNotLoggedIn changeUserType={this.changeUserType} />;
    }
    if (this.state.user === "teacher") {
      return <h1>"teacher"</h1>
    }
  }
}

class AppNotLoggedIn extends React.Component {
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
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
