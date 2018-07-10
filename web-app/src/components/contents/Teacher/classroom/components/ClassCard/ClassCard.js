import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Avatar } from "antd";

/**
 * A card contains some brief information of a class.
 */
export default class ClassCard extends React.Component {
  render() {
    return (
      <div style={this.props.style} className={"ClassCard" + this.props.className}>
        <Card
          loading={this.props.loading}
          cover={
            <img
              alt="Image for classroom"
              src={this.props.classCardUrl}
            />
          }
          actions={[
            <Icon type="setting" />,
            <Icon type="edit" />,
            <Icon type="ellipsis" />
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={this.props.name}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}

ClassCard.propTypes = {
  /** Subtitle for the card. */
  name: PropTypes.string.isRequired,
  /** Title for the card. */
  description: PropTypes.string.isRequired,
  /** Url for the class card image. */
  classCardUrl: PropTypes.any,
  /** Url for the user avatar. */
  avatarUrl: PropTypes.any,
  /** Loading mode for asynchronous request. */
  loading: PropTypes.bool,
  /** Custom class name for the component for styling. */
  className: PropTypes.string,
  /** Custom styling. */
  style: PropTypes.object,
};

ClassCard.defaultProps = {
  name: "Name of the class",
  description: "Description of the class",
  classCardUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  avatarUrl: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  loading: false,
  className: "",
};
