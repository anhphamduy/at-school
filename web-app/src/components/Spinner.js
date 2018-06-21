import React from "react";
import { Icon } from "antd";

export default class Spinner extends React.Component {
  render() {
    return (
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
    );
  }
}
