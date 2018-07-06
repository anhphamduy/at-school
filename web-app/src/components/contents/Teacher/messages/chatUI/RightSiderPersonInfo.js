import React from "react";
import { Layout, Avatar, Spin } from "antd";

const RightSiderPersonInfo = props => (
  <Layout.Sider
    className="bigSideBar"
    theme="light"
    style={{ marginTop: "5vh" }}
  >
    {props.personInfo ? (
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: "5%",
            borderBottom: "1px rgb(232, 232, 232) solid"
          }}
        >
          <Avatar src={props.personInfo.avatar} size="large" shape="circle" />
          <div
            style={{ marginLeft: "4%" }}
            className="right-side-bar-user-info"
          >
            <h3 style={{ marginBottom: 0 }}>{props.personInfo.fullname}</h3>
            <h5 style={{ marginBottom: 0 }}>CS student</h5>
          </div>
        </div>
      </div>
    ) : (
      <Spinner />
    )}
  </Layout.Sider>
);

const Spinner = () => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px", textAlign: "center" }}>
      <Spin />
    </div>
  );
};

export default RightSiderPersonInfo;
