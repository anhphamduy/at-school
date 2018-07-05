import React from "react";
import ContentTeacher from "./ContentTeacher";
import Messages from "./messages/Messages";

export default class TeacherMessageScreen extends React.Component {
  render() {
    return (
      <ContentTeacher>
        <Messages />
      </ContentTeacher>
    );
  }
}
