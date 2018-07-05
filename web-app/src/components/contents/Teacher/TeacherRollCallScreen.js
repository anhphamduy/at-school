import React from "react";
import ContentTeacher from "./ContentTeacher";
import RollCall from "./rollcall/RollCall";

export default class TeacherRollCallScreen extends React.Component {
  render() {
    return (
      <ContentTeacher>
        <RollCall />
      </ContentTeacher>
    );
  }
}
