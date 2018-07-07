import React from "react";
import NoClass from "./components/NoClass"
import "./Classroom.css"

export default class Classroom extends React.Component {
  render() {
    return (
      <div className="Classroom" style={{ marginTop: "5vh", height: "95vh" }}>
        <NoClass />
      </div>
    );
  }
}
