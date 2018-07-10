import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import FormHeader from "./Header/ClassFormHeader";
import FormContent from "./Content/ClassFormContent";

/**
 * This is the main form to render. EditClassForm and NewClassForm are all using logic and styling from this component.
 */
export default class ClassForm extends React.Component {
  state = {
    className: "",
    classDescription: "",
    classFalcuty: "0",
    classLine: "1",
    token: this.props.token,
    steps: ["Class Info", "Class Avatar", "Confirm"],
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
        className="ClassForm"
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.onClickOk}
        onCancel={this.onClickCancel}
        okText={
          this.state.current === this.state.steps.length - 1 ? "Add" : "Next"
        }
        cancelText={this.state.current > 0 ? "Previous" : "Cancel"}
      >
        <MainForm
          current={this.state.current}
          handleInputChange={this.handleInputChange}
          steps={this.state.steps}
        />
      </Modal>
    );
  }
}

ClassForm.propTypes = {
  /** Show the form or not. */
  visible: PropTypes.bool.isRequired,
  /** Function to handle when the user submit the form and pass all the validations. An object would be the argument of the function. */
  handleAdd: PropTypes.func.isRequired,
  /** Function to handle when the user closing the form. */
  handleCancel: PropTypes.func.isRequired,
  /** Title for the form, will be put inside the header of the modal. */
  title: PropTypes.string.name,
}

ClassForm.defaultProps = {
  title: "New classroom"
}

const MainForm = props => (
  <React.Fragment>
    <FormHeader current={props.current} steps={props.steps} />
    <FormContent
      current={props.current}
      handleInputChange={props.handleInputChange}
    />
  </React.Fragment>
);

MainForm.propTypes = {
  /** Current step in the form */
  current: PropTypes.number.isRequired,
  /** All the steps in the form */
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Handlers for changes in input in the form (required curried function) */
  handleInputChange: PropTypes.func.isRequired
};
