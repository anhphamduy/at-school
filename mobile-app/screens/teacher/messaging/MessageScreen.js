import React from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { AppLoading } from "expo";
id = 0;

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export class TeacherMessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  static navigationOptions = {
    title: "Messages"
  };

  _getUsers = async () => {
    try {
      let response = await fetch("https://randomuser.me/api/?results=1000");
      let responseJson = await response.json();
      this.setState({ users: responseJson.results });
      return responseJson.results;
    } catch (error) {
      console.error(error);
    }
  };

  _onSelectMessage = name => {
    this.props.navigation.push("TeacherDetailsMessage", { name });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._getUsers}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    } else {
      console.log(this.state.users.slice(0, this.state.end));
      return (
        <ScrollView>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.users}
            renderItem={({ item }) => (
              <UserMessage
                onPress={this._onSelectMessage}
                user={item}
              />
            )}
          />
        </ScrollView>
        // <ScrollView
        //   onScroll={({ nativeEvent }) => {
        //     if (isCloseToBottom(nativeEvent)) {
        //       if (this.state.end + 10 > this.state.users.length) {
        //         this.state.end = this.state.users.length;
        //       } else {
        //         this.state.end += 10;
        //       }
        //       console.log(this.state.end)
        //       this.forceUpdate()

        //     }
        //   }}
        //   scrollEventThrottle={400}
        // >

        //   {
        //     this.state.users
        //     .slice(0, this.state.end)
        //     .map(user => (
        //       <UserMessage
        //         key={Math.floor(Math.random() * 100000 + 1)}
        //         onPress={this._onSelectMessage}
        //         user={user}
        //       />
        //     ))}
        // </ScrollView>
      );
    }
  }
}

class UserMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const name = `${this.props.user.name.first} ${
      this.props.user.name.last
    }`.replace(/\b\w/g, l => l.toUpperCase());

    this.setState({ name });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(this.state.name)}
        style={[{ margin: 15, paddingBottom: 10 }]}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View style={[{ flex: 0.2 }, styles.shadow]}>
            <Image
              key={this.props.user.picture.large}
              source={{
                uri: this.props.user.picture.large,
                cache: "force-cache"
              }}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 25
                }
              ]}
            />
          </View>
          <View
            style={{
              flex: 0.8,
              flexDirection: "column"
            }}
          >
            <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
              {this.state.name}
            </Text>
            <Text style={{ fontWeight: "100" }}>
              This is the last messgage i want to talk about this as well as the
              normal one
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1
  }
});
