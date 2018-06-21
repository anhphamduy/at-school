import React, { Component } from "react";
import NavNotLoggedIn from "./components/navs/NavNotLoggedIn";
import ContentNotLoggedIn from "./components/contents/ContentNotLoggedIn";

class App extends Component {
  state = {
    login: false,
    mode: "login"
  };

  _changeModeNotLoggedIn = item => {
    this.setState({ mode: item.key });
  };

  render() {
    return (
      <div>
        <div >
          <NavNotLoggedIn changeMode={this._changeModeNotLoggedIn} />
        </div>
        <div style={{ marginLeft: "15%" }}>
          <ContentNotLoggedIn mode={this.state.mode} />
        </div>
      </div>
    );
  }
}

export default App;
