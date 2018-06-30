import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import "antd/dist/antd.css";
import { login } from "../../api/auth";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    let vals = "";
    let err = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.changeLoading()
        vals = values;
      } else {
        err = true;
      }
    });
    try {
      if (!err) {
        const data = await login(vals.username, vals.password, this.props.changeLoading);
        this.props.changeUserType(data)
      }
    } catch (error) {
      const message = JSON.parse(error.message)
      console.log(message.message);
      this.props.changeLoading()
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={8}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a style={{ float: "right" }} href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Col>
        <Col span={16} />
      </Row>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login;
