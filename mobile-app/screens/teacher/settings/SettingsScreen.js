import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export class TeacherSettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  _onSelectAccount = () => {
    this.props.navigation.push("TeacherAccountSettings");
  };

  _onSelectNotification = () => {
    this.props.navigation.push("TeacherNotificationSettings");
  };

  _onSelectLogOut = () => {
    this.props.navigation.navigate("Login");
  };

  _onSelectHelp = () => {};

  render() {
    return (
      <View style={{ margin: 10 }}>
        <SettingRow
          onPress={this._onSelectAccount}
          icon="user-circle"
          title="Account Settings"
          info="This is where you can update all of your information relating to your account such as password or security."
        />
        <SettingRow
          onPress={this._onSelectNotification}
          icon="bell"
          title="Notifications"
          info="All the settings about notifications."
        />
        <SettingRow
          onPress={this._onSelectHelp}
          icon="question-circle"
          title="Help & Support"
          info="If you need any help or want to report a bug, then you can find all the support here."
        />
        <SettingRow
          onPress={this._onSelectLogOut}
          icon="sign-out"
          title="Log out"
          info="If you're logging out, you will no longer have access to @ school."
        />
      </View>
    );
  }
}

const SettingRow = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ margin: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <Icon name={props.icon} style={{ flex: 0.15 }} size={25} />
        <View
          style={{
            borderBottomColor: "rgba(200, 200, 200, 1)",
            borderBottomWidth: 1,
            flex: 1,
            paddingBottom: 20
          }}
        >
          <View style={{}}>
            <Text>{props.title}</Text>
            <Text>{props.info}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
