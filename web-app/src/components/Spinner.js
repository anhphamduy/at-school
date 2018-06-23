import React from "react";
import { Icon } from "antd";
import { CSSTransition } from "react-transition-group";

export default class Spinner extends React.Component {
  render() {
    return (
      <CSSTransition
        in={this.props.loading}
        transitionAppear={true}
        transitionLeave={true}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <Icon
          type="loading"
          style={{
            fontSize: 50,
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "-25px 0px 0px -25px"
          }}
          spin
        />
      </CSSTransition>
    );
  }
}
