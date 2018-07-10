import React from "react";
import PropTypes from "prop-types";
import ClassInfo from "./Info/ClassFormInfo";
import PictureUpload from "./PictureUpload/ClassFormPictureUpload";
import ClassConfirm from "./Confirm/ClassFormConfirm";

/**
 * Rendering form content based on the current position in the form: basic information, picture uploading, confirmation.
 */
const ClassFormContent = props => (
  <div className="steps-content">
    {props.current === 0 && (
      <ClassInfo handleInputChange={props.handleInputChange} />
    )}
    {props.current === 1 && (
      <PictureUpload handleInputChange={props.handleInputChange} />
    )}
    {props.current === 2 && (
      <ClassConfirm handleInputChange={props.handleInputChange} />
    )}
  </div>
);

ClassFormContent.propTypes = {
  /** Current step in the form. */
  current: PropTypes.number.isRequired
};

export default ClassFormContent;
