import React from "react";
import { Layout } from "antd";
import NavTeacher from "./navs/Teacher/NavTeacher";
import { Route } from "react-router-dom";
import TeacherDashboardScreen from "./contents/Teacher/TeacherDashboardScreen";
import TeacherClassroomScreen from "./contents/Teacher/TeacherClassroomScreen";
import TeacherMessageScreen from "./contents/Teacher/TeacherMessageScreen";
import TeacherRollCallScreen from "./contents/Teacher/TeacherRollCallScreen";

const AppTeacher = () => (
  <div>
    <Layout style={{ minHeight: "100%" }}>
      <NavTeacher />
      <Route
        path={`/teacher/dashboard`}
        component={() => <TeacherDashboardScreen />}
      />
      <Route
        path={`/teacher/classroom`}
        component={() => <TeacherClassroomScreen />}
      />
      <Route
        path={`/teacher/message`}
        component={() => <TeacherMessageScreen />}
      />
      <Route
        path={`/teacher/rollcall`}
        component={() => <TeacherRollCallScreen />}
      />
    </Layout>
  </div>
);

export default AppTeacher;
