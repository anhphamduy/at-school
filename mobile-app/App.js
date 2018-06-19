import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import LoginScreen from "./screens/auth/LoginScreen";
import {
  TeacherOverviewScreen,
  TeacherSettingsScreen,
  TeacherAccountSettingsScreen,
  TeacherNotificationSettingsScreen,
  TeacherMessageScreen,
  TeacherDetailsMessageScreen,
} from "./screens/teacher/Screens";
import Ionicons from "react-native-vector-icons/Ionicons";

const TeacherSettingsStack = createStackNavigator(
  {
    TeacherSettings: TeacherSettingsScreen,
    TeacherAccountSettings: TeacherAccountSettingsScreen,
    TeacherNotificationSettings: TeacherNotificationSettingsScreen
  },
  {
    initialRouteName: "TeacherSettings",
    navigationOptions: {
      headerTintColor: "orange",
      headerStyle: {}
    }
  }
);

const TeacherMessagingStack = createStackNavigator(
  {
    TeacherMessage: TeacherMessageScreen,
    TeacherDetailsMessage: TeacherDetailsMessageScreen,
  },
  {
    initialRouteName: "TeacherMessage",
    navigationOptions: {
      headerTintColor: "orange",
      headerStyle: {}
    }
  }
);

const TeacherScreen = createBottomTabNavigator(
  {
    Overview: TeacherOverviewScreen,
    Message: TeacherMessagingStack,
    Settings: TeacherSettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Overview") {
          iconName = `ios-document${focused ? "" : "-outline"}`;
        } else if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        } else if (routeName === "Message") {
          iconName = `ios-text${focused ? "" : "-outline"}`;
        }

        return <Ionicons name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "gray"
    }
  }
);

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Teacher: TeacherScreen
});

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator
        screenProps={
          {
            // put in global props here
          }
        }
      />
    );
  }
}
