import React from "react";
import { Menu, Icon, Avatar } from "antd";
import NavContainer from "../NavContainer";
import SchoolLogo from "../SchoolLogo";
import { logout } from "../../../api/auth";
import "antd/dist/antd.css";
import "./Navs.css";

export default class NavNotLoggedIn extends React.Component {
  state = {
    spinnerVisible: false
  };

  changeMenuSelection = menuKey => {
    if (menuKey === "6") {
      this.props.changeLoading()
      logout(this.props.userInfo.token, () => {
        this.props.changeLoading()
        this.props.changeUserType({ userType: "anomynous" });
      });
    }
    this.setState({
      selectedKeys: [menuKey]
    });
  };

  render() {
    return (
      <NavContainer>
        <SchoolLogo />
        <Menu
          theme="light"
          mode="inline"
          onClick={item => {
            this.changeMenuSelection(item.key);
          }}
          selectedKeys={
            !this.state.selectedKeys ? ["2"] : this.state.selectedKeys
          }
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
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="message" />
            <span>Messages</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="logout" />
            <span>Log out</span>
          </Menu.Item>
        </Menu>
      </NavContainer>
    );
  }
}

const UserAvatarNav = props => {
  return (
    <div>
      <Icon
        style={{
          alignItems: "center",
          width: "32px",
          marginLeft: "-8px",
          height: "32px"
        }}
      >
        <Avatar shape="square" src={props.userInfo.avatarUrl} />
      </Icon>
      <span>{props.userInfo.fullname}</span>
    </div>
  );
};
