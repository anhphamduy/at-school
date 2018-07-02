import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AppNotLoggedIn from "./components/AppNotLoggedIn";
import AppTeacher from "./components/AppTeacher";
import Spinner from "./components/Spinner";
import "./animations/fade.css";

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
      <div>
        <Spinner loading={this.state.loading} />
        <BrowserRouter>
          {/* <Spinner loading={this.state.loading} /> */}
          {/* <AnomynousComponent
          in={this.state.userInfo.userType === "anomynous"}
          changeUserType={this.changeUserType}
          changeLoading={this.changeLoading}
        />
        <TeacherComponent
          in={this.state.userInfo.userType === 2}
          changeLoading={this.changeLoading}
          changeUserType={this.changeUserType}
          userInfo={this.state.userInfo}
        /> */}
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <AnomynousComponent
                  changeUserType={this.changeUserType}
                  changeLoading={this.changeLoading}
                />
              )}
            />
            <Route
              exact
              path="/teacher"
              component={() =>
                this.state.userInfo.userType === 2 ? (
                  <TeacherComponent
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
      </div>
    );
  }
}

const AnomynousComponent = props => {
  return <AppNotLoggedIn {...props} />;
};

const TeacherComponent = props => {
  return <AppTeacher {...props} />;
};

const StudentComponent = props => {
  return <h1>Student coming soon!</h1>;
};

export default App;
