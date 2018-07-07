import React from "react";
import { Row, Col, Layout } from "antd";

export default class ContentContainer extends React.Component {
  render() {
    return (
      <Layout.Content
        style={{
          background: "#fff"
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
      </Layout.Content>
    );
  }
}
