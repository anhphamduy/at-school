import React from "react";
import { Modal, Button, Input, Select } from "antd";

export default class NoClass extends React.Component {
  state = {
    newClassFormVisible: false
  };

  showAddClassroomForm = () => {
    this.setState({
      newClassFormVisible: true
    });
  };

  handleAdd = classInfo => {
    console.log(classInfo);
    this.setState({
      newClassFormVisible: false
    });
  };

  handleCancel = e => {
    console.log(e);
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

class NewClassForm extends React.Component {
  state = {
    className: "",
    classDescription: "",
    classFalcuty: "0"
  };

  handleInputChange = fieldChange => e => {
    // because select tag has value directly, so has to use condition to get only value of e when e.target exists
    if (e.target) {
      this.setState({ [fieldChange]: e.target.value });
    } else {
      this.setState({ [fieldChange]: e });
    }
  };

  render() {
    return (
      <Modal
        className="NewClassForm"
        title="New classroom"
        visible={this.props.visible}
        onOk={() => this.props.handleAdd(this.state)}
        onCancel={this.props.handleCancel}
        okText="Add"
      >
        <div>
          <p>Class name</p>
          <Input
            onChange={this.handleInputChange("className")}
            placeholder="Classroom name"
          />
        </div>
        <div>
          <p>Description</p>
          <Input.TextArea
            onChange={this.handleInputChange("classDescription")}
            placeholder="The class is about..."
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <LinePicker onChange={this.handleInputChange("classFalcuty")} />
        </div>
        <div>
          <FalcutyPicker onChange={this.handleInputChange("classFalcuty")} />
        </div>
      </Modal>
    );
  }
}

const LinePicker = props => (
  <div className="Picker">
    <p>Line:</p>
    <Select onChange={props.onChange} defaultValue="0">
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
      <Select.Option value="3">3</Select.Option>
      <Select.Option value="4">4</Select.Option>
      <Select.Option value="5">5</Select.Option>
      <Select.Option value="6">6</Select.Option>
      <Select.Option value="7">7</Select.Option>
      <Select.Option value="8">8</Select.Option>
      <Select.Option value="9">9</Select.Option>
    </Select>
  </div>
);

const FalcutyPicker = props => (
  <div className="Picker">
    <p>Falcuty: </p>
    <Select onChange={props.onChange} defaultValue="0">
      <Select.Option value="0">Arts</Select.Option>
      <Select.Option value="1">English and Humanities</Select.Option>
      <Select.Option value="2">Languages</Select.Option>
      <Select.Option value="3">Mathematics</Select.Option>
      <Select.Option value="4">Physical and Outdoor Education</Select.Option>
      <Select.Option value="5">Social and Behavioural Sciences</Select.Option>
      <Select.Option value="6">Technology and Design</Select.Option>
    </Select>
  </div>
);
