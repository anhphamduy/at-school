import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";

export class TeacherDetailsMessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state.params)
    return {
      title: navigation.state.params.name
    };
  };

  _renderCustomView = props => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
              }}
            />
          </MapView>
        </View>
      );
    }
    return null;
  };

  _onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  componentWillMount() {
    ({ name } = this.props.navigation.state.params);
    this.setState({ name });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._onSend(messages)}
        renderCustomView={this._renderCustomView}
        user={{
          _id: 1
        }}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: "lightgreen" },
            onPress: props => alert(`press on ${props}`)
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3
  }
});
