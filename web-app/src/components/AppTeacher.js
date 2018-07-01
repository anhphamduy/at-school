import React from "react";
import { Layout } from "antd";
import NavTeacher from "./navs/Teacher/NavTeacher";
import ContentTeacher from "./contents/Teacher/ContentTeacher";

export default class AppTeacher extends React.Component {
  state = {
    currentMenu: "4",
    layoutMarginLeft: 80
  };

  changeLayoutMarginLeft = value => {
    this.setState({
      layoutMarginLeft: value
    });
  };

  changeMenu = currentMenu => {
    this.setState({ currentMenu });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <NavTeacher changeLayoutMarginLeft={this.changeLayoutMarginLeft} changeMenu={this.changeMenu} {...this.props} />
        <Layout>
          <ContentTeacher
            {...this.props}
            layoutMarginLeft={this.state.layoutMarginLeft}
            currentMenu={this.state.currentMenu}
          />
        </Layout>
      </Layout>
    );
  }
}
