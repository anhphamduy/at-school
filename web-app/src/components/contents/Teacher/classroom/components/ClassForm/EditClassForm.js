import React from "react";
import ClassForm from "./Form/ClassForm";
import { AppContext } from "../../../../../../App";

/** 
 * Render ClassForm but with "Edit classroom" title
 */
const EditClassForm = props => (
  <AppContext>
    {value => <ClassForm title="Edit classroom" {...props} token={value.userInfo.token} />}
  </AppContext>
);

export default EditClassForm;
