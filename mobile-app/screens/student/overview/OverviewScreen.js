import React from "react";
import { View } from "react-native";

export class StudentOverviewScreen extends React.Component {
  render() {
    console.log(this.props.navigation.state.params)
    return <View>Hello</View>;
  }
}
