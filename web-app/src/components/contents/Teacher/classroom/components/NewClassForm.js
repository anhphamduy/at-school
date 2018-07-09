import React from "react";
import { Modal, Input, Select } from "antd";
import { AppContext } from "../../../../../App";

class NewClassForm extends React.Component {
  state = {
    className: "",
    classDescription: "",
    classFalcuty: "0",
    classLine: "1",
    token: this.props.token
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
          <LinePicker onChange={this.handleInputChange("classLine")} />
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
    <Select onChange={props.onChange} defaultValue="1">
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

export default props => (
  <AppContext>
    {value => <NewClassForm {...props} token={value.userInfo.token} />}
  </AppContext>
);
