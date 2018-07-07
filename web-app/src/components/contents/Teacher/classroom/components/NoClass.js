import React from "react";
import { Modal, Button } from "antd";

export default class NoClass extends React.Component {
  state = {
    visible: false
  };

  showAddClassroomForm = () => {
    this.setState({
      visible: true
    });
  };

  handleAdd = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div style={{ padding: "80px 100px", textAlign: "center" }}>
        <div className="NoClass">
          <p>Looks like you are not managing any classrooms... yet.</p>
          <Button size="large" type="primary" onClick={this.showAddClassroomForm}>
            Create your first new classroom
          </Button>
          <div>
            <img src="/classroomIcon.png" />
          </div>
        </div>
        <NewClassForm visible={this.state.visible} handleAdd={this.handleAdd} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}

const NewClassForm = props => (
  <Modal
    title="New classroom"
    visible={props.visible}
    onOk={props.handleAdd}
    onCancel={props.handleCancel}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
);
