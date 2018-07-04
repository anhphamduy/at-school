import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AppNotLoggedIn from "./components/AppNotLoggedIn";
import AppTeacher from "./components/AppTeacher";
import Spinner from "./components/Spinner";
import "./animations/fade.css";

const UserContext = React.createContext()

class App extends Component {
  state = {
    loading: false,
    finishedAnimation: {
      anomynous: true,
      teacher: true,
      student: true
    },
    userInfo: {
      userType: "anomynous"
    }
  };

  changeUserType = userInfo => {
    if (userInfo.userType === "anomynous") {
      this.setState({ userInfo: { userType: "anomynous" } });
    } else {
      this.setState({ userInfo: { ...userInfo } });
    }
  };

  changeLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.userInfo}>
        <Spinner loading={this.state.loading} />
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <AppNotLoggedIn
                  changeUserType={this.changeUserType}
                  changeLoading={this.changeLoading}
                />
              )}
            />
            <Route
              path="/teacher"
              component={() =>
                this.state.userInfo.userType === 2 ? (
                  <AppTeacher
                    changeLoading={this.changeLoading}
                    changeUserType={this.changeUserType}
                    userInfo={this.state.userInfo}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/student"
              component={() =>
                this.state.userInfo.userType === 1 ? (
                  <StudentComponent
                    changeLoading={this.changeLoading}
                    changeUserType={this.changeUserType}
                    userInfo={this.state.userInfo}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

const StudentComponent = props => {
  return <h1>Student coming soon!</h1>;
};

export default App;
