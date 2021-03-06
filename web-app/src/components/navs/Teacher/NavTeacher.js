import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Avatar } from "antd";
import NavContainer from "../NavContainer";
import SchoolLogo from "../SchoolLogo";
import { logout } from "../../../api/auth";
import { AppContext } from "../../../App";
import "antd/dist/antd.css";
import "./Navs.css";

class NavTeacher extends React.Component {
  state = {
    spinnerVisible: false,
    menuDisabled: true
  };

  changeMenuSelection = menuKey => {
    if (menuKey === "8") {
      this.props.changeLoading();
      logout(this.props.userInfo.token, () => {
        this.props.changeLoading();
        this.props.changeUserType({ userType: "anomynous" });
      });
    }
  };

  render() {
    return (
      <div>
        <NavContainer>
          <SchoolLogo />
          <Menu
            theme="light"
            mode="inline"
            onClick={item => {
              this.changeMenuSelection(item.key);
            }}
          >
            <hr
              style={{
                margin: "15px",
                marginBottom: "7px",
                borderColor: "hsla(0,0%,100%,.5)",
                borderWidth: "0.2"
              }}
            />
            <Menu.SubMenu
              key="user"
              className="UserAvatarNav"
              title={<UserAvatarNav userInfo={this.props.userInfo} />}
            >
              <Menu.Item key="1">
                <Icon type="profile" />
                <span>My profile</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="edit" />
                <span>Edit Profile</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="setting" />
                <span>Settings</span>
              </Menu.Item>
            </Menu.SubMenu>

            <hr
              style={{
                margin: "15px",
                borderColor: "hsla(0,0%,100%,.5)",
                borderWidth: "0.2"
              }}
            />
            <Menu.Item key="4">
              <Link to={"/teacher/dashboard"}>
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to={"/teacher/classroom"}>
                <Icon type="book" />
                <span>Classroom</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={"/teacher/message"}>
                <Icon type="message" />
                <span>Messages</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to={"/teacher/rollcall"}>
                <Icon type="video-camera" />
                <span>Roll Call</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="logout" />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </NavContainer>
      </div>
    );
  }
}

// please remove important from source code in order to make the style works padding: 0 32px !important in css dist antd;
const UserAvatarNav = props => {
  return (
    <div
      style={{
        alignItems: "center"
      }}
    >
      <Avatar
        style={{ marginRight: "10px" }}
        shape="square"
        src={props.userInfo.avatarUrl}
      />
      <span
        id="UserAvatarNavText"
        style={{ fontSize: "14px", textTransform: "capitalize" }}
      >
        {props.userInfo.fullname}
      </span>
    </div>
  );
};

export default props => (
  <AppContext.Consumer>
    {users => <NavTeacher {...props} {...users} />}
  </AppContext.Consumer>
);
