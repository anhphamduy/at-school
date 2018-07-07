import React from "react";
import ContentTeacher from "./ContentTeacher";
import Classroom from "./classroom/Classroom";

export default class TeacherClassroomScreen extends React.Component {
  render() {
    return (
      <ContentTeacher>
        <Classroom />
      </ContentTeacher>
    );
  }
}
