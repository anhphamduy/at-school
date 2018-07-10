import React from "react";
import ClassCard from "../../../../ClassCard/ClassCard";

/**
 * The final stage of the form. This will show the users the class card that will be displayed to the students.
 */
const ClassFormConfirm = props => (
  <div>
    <h5>Done! It would appear like below to your students: </h5>
    <ClassCard />
  </div>
);

export default ClassFormConfirm;
