import React from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { LinearGradient } from "expo";
import Loader from "../../components/Loader";
import { login } from "../../api/auth";

export default class LoginScreen extends React.Component {
  state = {
    username: "",
    password: "",
    spinnerVisible: false
  };

  _login = async () => {
    this.setState({ spinnerVisible: true });
    try {
      const { token, userType } = await login(
        this.state.username,
        this.state.password
      );
      this.props.screenProps.handleLogin(token);
      this.setState({ spinnerVisible: false });

      if (userType === 1) {
        this.props.navigation.navigate("Student");
      } else if (userType === 2) {
        this.props.navigation.navigate("Teacher");
      }
    } catch (err) {
      this.setState({ err: err.message });
      this.setState({ spinnerVisible: false });
    }
  };

  handleUsernameUpdate = username => {
    this.setState({ username });
  };

  handlePasswordUpdate = password => {
    this.setState({ password });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={{ width: 50, height: 50, marginBottom: 10 }}
          source={require("../../assets/gngc.png")}
        />
        <FormInput
          secureTextEntry={false}
          onChangeText={this.handleUsernameUpdate}
          iconName="user"
          placeholder="Username"
          value={this.state.username}
        />
        <FormInput
          secureTextEntry={true}
          onChangeText={this.handlePasswordUpdate}
          iconName="lock"
          placeholder="Password"
          value={this.state.password}
        />
        <View style={styles.button}>
          <Button
            color="white"
            style={styles.button}
            onPress={this._login}
            title="Log in"
          />
        </View>
        <LinearGradient
          colors={["#e6e9f0", "#eef1f5"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            zIndex: -100,
            minHeight: Dimensions.get("window").height
          }}
        />
        <Loader animating={this.state.spinnerVisible} />
      </KeyboardAvoidingView>
    );
  }
}

const FormInput = props => {
  return (
    <View style={styles.formInput}>
      <View style={{ width: 40 }}>
        <Icon name={props.iconName} size={30} style={{ padding: 10 }} />
      </View>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        autoCapitalize="none"
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={{ flex: 1, padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  formInput: {
    flexDirection: "row",
    margin: 20,
    marginBottom: 0,
    borderWidth: 1.1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8
  },
  button: {
    backgroundColor: "orange",
    margin: 20,
    marginTop: 34,
    borderRadius: 8,
    alignSelf: "stretch"
  }
});
