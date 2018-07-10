import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "../Picker.css"

/**
 * A list of selections for lines: 1, 2, 3,...
 */
const ClassFormLinePicker = props => (
  <div className={"Picker" + props.className} style={props.style}>
    <p>Line:</p>
    <Select onChange={props.onChange} defaultValue="1">
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
      <Select.Option value="3">3</Select.Option>
      <Select.Option value="4">4</Select.Option>
      <Select.Option value="5">5</Select.Option>
      <Select.Option value="6">6</Select.Option>
      <Select.Option value="7">7</Select.Option>
      <Select.Option value="8">8</Select.Option>
      <Select.Option value="9">9</Select.Option>
    </Select>
  </div>
);

ClassFormLinePicker.propTypes = {
  /** Callback when selection is changing. */
  onChange: PropTypes.func,
  /** Custom class name for the component for styling. */
  className: PropTypes.string,
  /** Custom styling. */
  style: PropTypes.object
};

ClassFormLinePicker.defaultProps = {
  className: ""
};

export default ClassFormLinePicker;
