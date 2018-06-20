import React from "react";
import { View } from "react-native";

export class TeacherOverviewScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state.params)
    return <View>Hello</View>;
  }
}
