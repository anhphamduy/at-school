import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera, Permissions } from "expo";
import Loader from "../../../components/Loader";
import uploadImage from "../../../api/camera"

export class StudentCameraScreen extends React.Component {
  render() {
    return <CameraComponent />;
  }
}

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    spinnerVisible: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true });
      const base64Data = await photo.base64
      uploadImage(base64Data)
    }
  };

  uploadPicture = async () => {

  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: "red", padding: 20 }}
            onPress={() => {
              this.takePicture();
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <Loader animating={this.state.spinnerVisible} />
        </View>
      );
    }
  }
}
