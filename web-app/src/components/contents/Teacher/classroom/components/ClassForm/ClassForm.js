import React from "react";
import { Steps, Modal, Input, Select } from "antd";

export default class ClassForm extends React.Component {
  state = {
    className: "",
    classDescription: "",
    classFalcuty: "0",
    classLine: "1",
    token: this.props.token,
    steps: [
      {
        title: "Class Info",
        content: "First-content"
      },
      {
        title: "Class Avatars",
        content: "Second-content"
      },
      {
        title: "Confirm",
        content: "Last-content"
      }
    ],
    current: 0
  };

  componentWillMount() {
    // do some stuff with states here
  }

  handleInputChange = fieldChange => e => {
    // because select tag has value directly, so has to use condition to get only value of e when e.target exists
    if (e.target) {
      this.setState({ [fieldChange]: e.target.value });
    } else {
      this.setState({ [fieldChange]: e });
    }
  };

  onClickOk = () => {
    if (this.state.current === this.state.steps.length - 1) {
      this.props.handleAdd(this.state);
    } else {
      this.setState({ current: this.state.current + 1 });
    }
  };

  onClickCancel = () => {
    if (this.state.current === 0) {
      this.props.handleCancel();
    } else {
      this.setState({ current: this.state.current - 1 });
    }
  };

  render() {
    return (
      <Modal
        className="NewClassForm"
        title="New classroom"
        visible={this.props.visible}
        onOk={this.onClickOk}
        onCancel={this.onClickCancel}
        okText={
          this.state.current === this.state.steps.length - 1 ? "Add" : "Next"
        }
        cancelText={this.state.current > 0 ? "Previous" : "Cancel"}
      >
        <StepHeader current={this.state.current} steps={this.state.steps} />
        <StepContent
          current={this.state.current}
          handleInputChange={this.handleInputChange}
        />
      </Modal>
    );
  }
}

const StepHeader = props => (
  <Steps current={props.current}>
    {props.steps.map(item => (
      <Steps.Step key={item.title} title={item.title} />
    ))}
  </Steps>
);

const StepContent = props => (
  <div className="steps-content">
    {props.current === 0 && (
      <ClassInfo handleInputChange={props.handleInputChange} />
    )}
    {props.current === 2 && (
      <ClassConfirm handleInputChange={props.handleInputChange} />
    )}

  </div>
);

const ClassInfo = props => (
  <React.Fragment>
    <div>
      <p>Class name</p>
      <Input
        onChange={props.handleInputChange("className")}
        placeholder="Classroom name"
      />
    </div>
    <div>
      <p>Description</p>
      <Input.TextArea
        onChange={props.handleInputChange("classDescription")}
        placeholder="The class is about..."
      />
    </div>
    <div style={{ marginBottom: "20px" }}>
      <LinePicker onChange={props.handleInputChange("classLine")} />
    </div>
    <div>
      <FalcutyPicker onChange={props.handleInputChange("classFalcuty")} />
    </div>
  </React.Fragment>
);

const ClassConfirm = props => (
  <div>
    <h5>Done! It would appear like below to your students: </h5>
  </div>
);

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
