import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
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
        <Spinner loading={this.state.loading} />
        <AnomynousComponent
          in={this.state.userInfo.userType === "anomynous"}
          changeUserType={this.changeUserType}
          changeLoading={this.changeLoading}
        />
        <TeacherComponent
          in={this.state.userInfo.userType === "teacher"}
          changeLoading={this.changeLoading}
          changeUserType={this.changeUserType}
          userInfo={this.state.userInfo}
        />
      </div>
    );
  }
}

const TransitionComponent = props => {
  return (
    <CSSTransition in={props.in} timeout={300} unmountOnExit classNames="fade">
      {props.children}
    </CSSTransition>
  );
};

const AnomynousComponent = props => {
  return (
    <TransitionComponent in={props.in}>
      <AppNotLoggedIn {...props} />
    </TransitionComponent>
  );
};

const TeacherComponent = props => {
  return (
    <TransitionComponent in={props.in}>
      <AppTeacher {...props} />
    </TransitionComponent>
  );
};

export default App;
