import React from "react";
import { Menu, Avatar, Layout, Input, Spin } from "antd";

export default class ListOfPeople extends React.Component {
  state = {
    searchValue: "",
    default: true,
    whenFocus: false
  };

  handleSearchFocus = () => {
    if (!this.state.searchValue) {
      this.setState({ default: false, whenFocus: true });
    }
  };

  handleChangeSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <div className="ListOfPeople">
        <Layout.Sider
          style={{
            overflow: "auto",
            height: "95vh",
            position: "fixed",
            top: "5vh",
            transition: "left 0.2s",
            borderRight: "1px rgb(232, 232, 232) solid"
          }}
          theme="light"
        >
          <Input.Search
            placeholder="Search messages"
            onSearch={value => console.log(value)}
            style={{ width: "168px", height: "32px", margin: "16px" }}
            onFocus={this.handleSearchFocus}
            onChange={this.handleChangeSearch}
          />
          {this.state.default ? <ListDefault {...this.props} /> : null}
          {this.state.whenFocus ? <ListWhenFocus {...this.props} /> : null}
        </Layout.Sider>
      </div>
    );
  }
}

class ListWhenFocus extends React.Component {
  state = {
    teachers: {
      onClick: false,
      clickValue: ["1"]
    },
    students: {
      onClick: false,
      clickValue: ["1"]
    }
  };

  fetchUser = async () => {
    fetch("https://randomuser.me/api/?results=20")
      .then(res => res.json())
      .then(res => {
        this.setState({
          teachers: {
            ...this.state.teachers,
            teacherData: res.results
          },
          students: {
            ...this.state.students,
            studentData: res.results
          }
        });
      });
  };

  componentWillMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <div className="ListWhenFocus-title">Teachers</div>
        {!this.state.teachers.teacherData ? (
          <MessageSpinner />
        ) : (
          <Menu
            selectedKeys={this.state.teachers.clickValue}
            theme="light"
            mode="inline"
            onClick={key => {
              // if the teachers are not onclicked, then set the menu of students to a random number
              // after set the key for teachers
              if (!this.state.teachers.onClick) {
                this.setState({
                  students: {
                    ...this.state.students,
                    clickValue: ["-1"],
                    onClick: false
                  }
                });
              }
              this.setState({
                teachers: {
                  ...this.state.teachers,
                  clickValue: [key.key],
                  onClick: true
                }
              });
              this.props.getPersonInfo(
                this.state.teachers.teacherData[Number.parseInt(key.key)]
              );
            }}
          >
            {this.state.teachers.teacherData.map((teacher, index) => (
              <Menu.Item key={index}>
                <Person
                  src={teacher.picture.medium}
                  fullname={`${teacher.name.first} ${teacher.name.last}`}
                />
              </Menu.Item>
            ))}
          </Menu>
        )}
        <div className="ListWhenFocus-title">Students</div>
        {!this.state.students.studentData ? (
          <MessageSpinner />
        ) : (
          <Menu
            selectedKeys={this.state.students.clickValue}
            onClick={key => {
              // if the teachers are not onclicked, then set the menu of students to a random number
              // after set the key for teachers
              if (!this.state.students.onClick) {
                this.setState({
                  teachers: {
                    ...this.state.teachers,
                    clickValue: ["-1"],
                    onClick: false
                  }
                });
              }
              this.setState({
                students: {
                  ...this.state.students,
                  clickValue: [key.key],
                  onClick: true
                }
              });
              this.props.getPersonInfo(
                this.state.students.studentData[Number.parseInt(key.key)]
              );
            }}
            theme="light"
            mode="inline"
          >
            {this.state.students.studentData.map((student, index) => (
              <Menu.Item
                key={index}
              >
                <Person
                  src={student.picture.medium}
                  fullname={`${student.name.first} ${student.name.last}`}
                />
              </Menu.Item>
            ))}
          </Menu>
        )}
      </div>
    );
  }
}

const MessageSpinner = () => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px", textAlign: "center" }}>
      <Spin />
    </div>
  );
};

const ListDefault = props => {
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key={1}>
        <Person fullname="Hello" />
      </Menu.Item>
      <Menu.Item key={2}>
        <Person fullname="Hello" />
      </Menu.Item>
    </Menu>
  );
};

const Person = props => {
  return (
    <div>
      <Avatar
        src={props.src ? props.src : ""}
        shape="circle"
        style={{ marginRight: "10px" }}
      />
      <span className="nav-text">{props.fullname}</span>
    </div>
  );
};
