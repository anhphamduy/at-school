import React from "react";
import ClassForm from "./Form/ClassForm";
import { AppContext } from "../../../../../../App";

/** 
 * Render ClassForm but with "New classroom title
 */
const NewClassForm = props => (
  <AppContext>
    {value => <ClassForm title="New classroom" {...props} token={value.userInfo.token} />}
  </AppContext>
);

export default NewClassForm;
