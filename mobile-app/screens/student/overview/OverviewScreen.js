import React from "react";
import { View } from "react-native";

export class StudentOverviewScreen extends React.Component {
  static navigationOptions = {
    tabBarOnPress: () => {
      console.log("Pressed")
    }
  }
  render() {
    return <View>Hello</View>;
  }
}
