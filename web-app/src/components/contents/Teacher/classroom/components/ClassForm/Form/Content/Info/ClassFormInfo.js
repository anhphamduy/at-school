import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import FalcutyPicker from "./Picker/Falcuty/ClassFormFalcutyPicker";
import LinePicker from "./Picker/Line/ClassFormLinePicker";
import "./Info.css";

/**
 * This will render a form letting the users fill in some basic information of class: name, description, etc.
 */
const ClassFormInfo = props => (
  <React.Fragment>
    <div className="ClassFormInfo">
      <div>
        <p>Class name</p>
        <Input
          onChange={props.handleInputChange("className")}
          placeholder="Classroom name"
        />
      </div>
      <div>
        <p>Description</p>
        <Input.TextArea
          onChange={props.handleInputChange("classDescription")}
          placeholder="The class is about..."
        />
      </div>
      <LinePicker onChange={props.handleInputChange("classLine")} />
      <FalcutyPicker onChange={props.handleInputChange("classFalcuty")} />
    </div>
  </React.Fragment>
);

ClassFormInfo.propTypes = {
  /** Event handler for when input changing. Required a curried function. */
  handleInputChange: PropTypes.func.isRequired
};

export default ClassFormInfo;
