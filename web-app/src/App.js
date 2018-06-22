import React, { Component } from "react";
import AppNotLoggedIn from "./components/AppNotLoggedIn";
import AppTeacher from "./components/AppTeacher";
import Spinner from "./components/Spinner";

class App extends Component {
  state = {
    loading: false,
    userInfo: {
      userType: "anomynous"
    }
  };

  changeUserType = userInfo => {
    if (userInfo.userType === "anomynous") {
      this.setState({ userInfo: { userType: "anomynous" } });
      console.log(this.state);
    } else {
      this.setState({ userInfo: { ...userInfo } });
    }
  };

  changeLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <div>
        {this.state.loading ? <Spinner /> : null}
        {this.state.userInfo.userType === "anomynous" ? (
          <AppNotLoggedIn
            changeUserType={this.changeUserType}
            changeLoading={this.changeLoading}
          />
        ) : null}
        {this.state.userInfo.userType === "teacher" ? (
          <AppTeacher
            changeLoading={this.changeLoading}
            changeUserType={this.changeUserType}
            userInfo={this.state.userInfo}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
