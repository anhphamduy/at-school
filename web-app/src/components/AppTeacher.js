import React from "react";
import { Layout } from "antd";
import NavTeacher from "./navs/Teacher/NavTeacher"
import ContentTeacher from "./contents/Teacher/ContentTeacher"


export default class AppTeacher extends React.Component {

  state = {
    currentMenu: "4"
  }

  changeMenu = (currentMenu) => {
    this.setState({ currentMenu })
  }

  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <NavTeacher
          changeMenu={this.changeMenu}
          {...this.props}
        />
        <Layout>
          <ContentTeacher currentMenu={this.state.currentMenu}/>
        </Layout>
      </Layout>
    );
  }
}
