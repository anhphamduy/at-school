import React from "react";
import { Card, Icon, Avatar } from "antd";
import { getClassTeacher } from "../../../../../api/classroom";
import NewClassForm from "./ClassForm/NewClassForm";
import { createClass } from "../../../../../api/classroom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../../../animations/fade.css";

export default class ListOfClasses extends React.Component {
  state = {
    loadCard: true,
    newClassFormVisible: false
  };

  componentWillMount() {
    this.setState({ classes: this.props.classIds });
  }

  componentDidMount() {
    getClassTeacher(this.props.token)
      .then(res => res.results)
      .then(classes => this.setState({ classes, loadCard: false }));
  }

  showAddClassroomForm = () => {
    this.setState({
      newClassFormVisible: true
    });
  };

  handleAdd = async classInfo => {
    try {
      const result = await createClass(classInfo, classInfo.token, () =>
        this.setState({
          newClassFormVisible: false
        })
      );
      this.setState({
        classes: [
          ...this.state.classes,
          {
            id: await result.id,
            name: classInfo.className,
            description: classInfo.classDescription
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = e => {
    this.setState({
      newClassFormVisible: false
    });
  };

  render() {
    return (
      <TransitionGroup className="ListOfClasses">
        <CSSTransition timeout={500} classNames="fade">
          <AddClassCard onClick={this.showAddClassroomForm} />
        </CSSTransition>
        {this.state.classes.map(c => (
          <CSSTransition key={c.id} timeout={500} classNames="fade">
            <ClassCard {...c} loading={this.state.loadCard} />
          </CSSTransition>
        ))}
        <NewClassForm
          visible={this.state.newClassFormVisible}
          handleAdd={this.handleAdd}
          handleCancel={this.handleCancel}
        />
      </TransitionGroup>
    );
  }
}

class AddClassCard extends React.Component {
  state = {
    buttonOpacity: 0.8
  };

  render() {
    return (
      <div
        className="ClassCard"
        onMouseOver={() => this.setState({ buttonOpacity: 1 })}
        onMouseLeave={() => this.setState({ buttonOpacity: 0.8 })}
        onClick={this.props.onClick}
      >
        <Card className="AddClassCard">
          <Icon
            type="plus"
            style={{
              fontSize: 180,
              opacity: this.state.buttonOpacity,
              transition: "opacity 0.3s"
            }}
          />
        </Card>
      </div>
    );
  }
}

export class ClassCard extends React.Component {
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
            title={this.props.name}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}
