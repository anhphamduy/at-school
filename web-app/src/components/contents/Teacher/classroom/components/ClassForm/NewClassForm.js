import React from "react";
import ClassForm from "./ClassForm";
import { AppContext } from "../../../../../../App";

const NewClassForm = props => <ClassForm {...props} title="New classroom" />;

export default props => (
  <AppContext>
    {value => <NewClassForm {...props} token={value.userInfo.token} />}
  </AppContext>
);
