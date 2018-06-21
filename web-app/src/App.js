import React, { Component } from "react";
import { Layout } from "antd";
import NavNotLoggedIn from "./components/navs/NavNotLoggedIn";
import ContentNotLoggedIn from "./components/contents/ContentNotLoggedIn";


class App extends Component {
  state = {
    login: false,
    mode: "login"
  };

  _changeModeNotLoggedIn = mode => {
    this.setState({ mode });
  };

  render() {
    return (
      <div>
      <Layout style={{minHeight: "100%"}}>
        
        <NavNotLoggedIn mode={this.state.mode} changeMode={this._changeModeNotLoggedIn} />
        <Layout>
          <ContentNotLoggedIn
            changeMode={this._changeModeNotLoggedIn}
            mode={this.state.mode}
          />
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default App;
