import React from "react";
import { Layout } from "antd";
import NavTeacher from "./navs/Teacher/NavTeacher";
import { Route } from "react-router-dom";
import TeacherDashboardScreen from "./contents/Teacher/TeacherDashboardScreen";
import TeacherMessageScreen from "./contents/Teacher/TeacherMessageScreen";

const AppTeacher = props => (
  <div>
    <Layout style={{ minHeight: "100%" }}>
      <NavTeacher {...props} />
      <Route
        path={`/teacher/dashboard`}
        component={() => <TeacherDashboardScreen {...props} />}
      />
      <Route
        path={`/teacher/message`}
        component={() => <TeacherMessageScreen {...props} />}
      />
    </Layout>
  </div>
);

export default AppTeacher;
