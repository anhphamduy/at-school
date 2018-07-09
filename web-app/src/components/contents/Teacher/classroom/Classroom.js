import React from "react";
import NoClass from "./components/NoClass";
import ListOfClasses from "./components/ListOfClasses";
import { teacherHasClass } from "./../../../../api/classroom";
import Spinner from "../../../Spinner";
import { AppContext } from "../../../../App";
import "./Classroom.css";

class Classroom extends React.Component {
  state = {
    hasClass: null,
    ready: false
  };

  componentDidMount() {
    this.getClassIds()
  }

  getClassIds = async () => {
    this.setState({ready: false})
    teacherHasClass(this.props.userInfo.token)
      .then(hasClass => {
        if (hasClass.result) {
          this.setState({
            hasClass: true,
            classIds: hasClass.classes,
            ready: true
          });
        } else {
          this.setState({ hasClass: false, ready: true });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <Spinner loading={!this.state.ready} />
        {this.state.ready ? (
          <div
            className="Classroom"
            style={{ marginTop: "5vh", minHeight: "95vh" }}
          >
            {!this.state.hasClass ? (
              <NoClass addClass={this.getClassIds}/>
            ) : (
              <ListOfClasses token={this.props.userInfo.token} classIds={this.state.classIds} />
            )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default props => (
  <AppContext>{value => <Classroom {...value} {...props} />}</AppContext>
);
