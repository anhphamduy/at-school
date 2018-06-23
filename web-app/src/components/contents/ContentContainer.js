import React from "react";
import { Row, Col, Layout } from "antd";

const { Content } = Layout;

export default class ContentContainer extends React.Component {
  render() {
    return (
      <Content
        style={{
          background: "#fff"
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            width: "100%"
          }}
        >
          {this.props.noGrid ? (
            this.props.children
          ) : (
            <Row>
              <Col span={1} />
              <Col span={22} style={{ marginTop: "5vh" }}>
                {this.props.children}
              </Col>
              <Col span={1} />
            </Row>
          )}
        </div>
      </Content>
    );
  }
}
