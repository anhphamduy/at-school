import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";

/**
 * Header for the form. This header will show a bunch of steps that the user needs to go through for completing the form.
 */
const ClassFormHeader = props => (
  <Steps current={props.current}>
    {props.steps.map((title, index) => (
      <Steps.Step key={index.toString()} title={title} />
    ))}
  </Steps>
);

ClassFormHeader.propTypes = {
  /** The current step in the form. */
  current: PropTypes.number,
  /** A list of steps in the form. */
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ClassFormHeader;
