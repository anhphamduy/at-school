import React from "react";
import { Card, Icon, Avatar } from "antd";

export default class ListOfClasses extends React.Component {

  state = {
    loadCard: true,
  }

  componentWillMount() {
    console.log(this.props.classes)
  }

  render() {
    return (
      <div className="ListOfClasses">
        <ClassCard loading={this.state.loadCard}/>
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    );
  }
}

class ClassCard extends React.Component {
  render() {
    return (
      <div className="ClassCard">
        <Card
          loading={this.props.loading}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
            title="Maths"
            description="This is the description"
          />
        </Card>
      </div>
    );
  }
}
