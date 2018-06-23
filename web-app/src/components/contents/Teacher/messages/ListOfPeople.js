import React from "react";
import { Menu, Icon, Layout, Input } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class ListOfPeople extends React.Component {
  render() {
    return (
      <div className="ListOfPeople">
        <Layout.Sider style={{
          overflow: 'auto', height: '95vh', position: 'fixed', top: "5vh",
          transition: "left 0.2s",
          borderRight: "1px rgb(232, 232, 232) solid"
        }} theme="light">
          <Input.Search
            placeholder="Search messages"
            onSearch={value => console.log(value)}
            style={{ width: "168px", height: "32px", margin: "16px" }}
          />
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="bar-chart" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="cloud-o" />
              <span className="nav-text">nav 5</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="appstore-o" />
              <span className="nav-text">nav 6</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="team" />
              <span className="nav-text">nav 7</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="shop" />
              <span className="nav-text">nav 8</span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      </div>
    );
  }
}
