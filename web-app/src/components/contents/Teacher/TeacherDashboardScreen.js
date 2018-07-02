import React from "react";
import ContentTeacher from "./ContentTeacher";

export default class TeacherOverviewScreen extends React.Component {
  render() {
    return (
      <ContentTeacher {...this.props}>
        <h1 style={{ marginTop: "100px" }}>This is dashboard screen</h1>
      </ContentTeacher>
    );
  }
}
