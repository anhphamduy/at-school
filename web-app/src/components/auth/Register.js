import React from "react";
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button } from "antd";
import "antd/dist/antd.css";
import { checkDuplicateUser, register } from "../../api/auth";

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    duplicateUsername: false,
    usernameValidate: {
      status: "",
      help: "",
      success: false
    },
    spinnerVisible: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.changeLoading()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!values.username) {
        this.setState({
          usernameValidate: {
            status: "error",
            help: "Please type in your username!"
          }
        });
        err = true;
      } else if (!this.state.usernameValidate.success) {
        this.setState({
          usernameValidate: {
            status: "error",
            help: "Username already exists!"
          }
        });
        err = true;
      }

      if (!err) {
        register(values, () => {
          this.props.changeMode("login");
          this.props.changeLoading()
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  _checkDuplicateUser = async event => {
    const username = event.target.value;
    // check duplicate username here
    this.setState({
      usernameValidate: {
        status: "validating",
        help: ""
      }
    });

    try {
      const duplicate = await checkDuplicateUser(username);
      if (duplicate) {
        this.setState({
          usernameValidate: {
            status: "error",
            help: "Username already exists!",
            success: false
          }
        });
      } else {
        this.setState({
          usernameValidate: {
            status: "success",
            help: "",
            success: true
          }
        });
      }
    } catch (error) {
      this.setState({
        usernameValidate: {
          status: "warning",
          help: "Cannot connect to the server",
          success: false
        }
      });
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["password1"], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 4 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 24,
          offset: 0
        },
        md: {
          span: 24,
          offset: 0
        },
        lg: {
          span: 20,
          offset: 4
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+61</Option>
        <Option value="87">+64</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Username"
          help={this.state.usernameValidate.help}
          validateStatus={this.state.usernameValidate.status}
        >
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please type in the username!"
              }
            ]
          })(<Input type="text" onChange={this._checkDuplicateUser} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("password1", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="First name">
          {getFieldDecorator("firstname", {
            rules: [
              {
                required: true,
                message: "Please enter your first name!"
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last name">
          {getFieldDecorator("lastname", {
            rules: [
              {
                required: true,
                message: "Please enter your last name!"
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("nickname", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Role">
          {getFieldDecorator("accessLevel", {
            rules: [{ required: true, message: "Please choose a role!" }]
          })(
            <Select>
              <Option value="1">Student</Option>
              <Option value="2">Teacher</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Register = Form.create()(RegistrationForm);

export default Register;
