import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = props => {
  return (
    <View
      style={[
        {
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-around"
        }
      ]}
    >
      <ActivityIndicator
        animating={props.animating}
        size="large"
        color="#000000"
      />
    </View>
  );
};

export default Loader;
