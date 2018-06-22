import React from "react";
import { Layout } from "antd";
import NavTeacher from "./navs/Teacher/NavTeacher"
import ContentTeacher from "./contents/Teacher/ContentTeacher"


export default class AppTeacher extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <NavTeacher
          {...this.props}
        />
        <Layout>
          <ContentTeacher />
        </Layout>
      </Layout>
    );
  }
}
