import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "../Picker.css";

/**
 * A list of selections for falcuties: Arts, Languages,...
 */
const ClassFormFalcutyPicker = props => (
  <div className={"Picker" + props.className} style={props.style}>
    <p>Falcuty: </p>
    <Select onChange={props.onChange} defaultValue="0">
      <Select.Option value="0">Arts</Select.Option>
      <Select.Option value="1">English and Humanities</Select.Option>
      <Select.Option value="2">Languages</Select.Option>
      <Select.Option value="3">Mathematics</Select.Option>
      <Select.Option value="4">Physical and Outdoor Education</Select.Option>
      <Select.Option value="5">Social and Behavioural Sciences</Select.Option>
      <Select.Option value="6">Technology and Design</Select.Option>
    </Select>
  </div>
);

ClassFormFalcutyPicker.propTypes = {
  /** Callback when selection is changing. */
  onChange: PropTypes.func,
  /** Custom class name for the component for styling. */
  className: PropTypes.string,
  /** Custom styling. */
  style: PropTypes.object
};

ClassFormFalcutyPicker.defaultProps = {
  className: ""
};

export default ClassFormFalcutyPicker;
