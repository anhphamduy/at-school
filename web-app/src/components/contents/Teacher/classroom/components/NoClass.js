import React from "react";
import { Button } from "antd";
import { createClass } from "../../../../../api/classroom";
import NewClassForm from "./ClassForm/NewClassForm";

export default class NoClass extends React.Component {
  state = {
    newClassFormVisible: false
  };

  showAddClassroomForm = () => {
    this.setState({
      newClassFormVisible: true
    });
  };

  handleAdd = async classInfo => {
    try {
      const result = await createClass(classInfo, classInfo.token, () =>
        this.setState(
          {
            newClassFormVisible: false
          },
          () => this.props.addClass()
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = e => {
    this.setState({
      newClassFormVisible: false
    });
  };

  render() {
    return (
      <div style={{ padding: "80px 100px", textAlign: "center" }}>
        <div className="NoClass">
          <p id="heading">
            Looks like you are not managing any classrooms... yet.
          </p>
          <Button
            size="large"
            type="primary"
            onClick={this.showAddClassroomForm}
          >
            Create your first new classroom
          </Button>
          <div>
            <img src="/classroomIcon.png" />
          </div>
          <NewClassForm
            visible={this.state.newClassFormVisible}
            handleAdd={this.handleAdd}
            handleCancel={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}
