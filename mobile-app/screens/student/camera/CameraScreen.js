import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera, Permissions, ImageManipulator } from "expo";
import Loader from "../../../components/Loader";
import { uploadImage } from "../../../api/camera";

export class StudentCameraScreen extends React.Component {
  render() {
    return <CameraComponent {...this.props}/>;
  }
}

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    spinnerVisible: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({ spinnerVisible: true });
      let photo = await this.camera.takePictureAsync({ base64: false });
      const photoRotate = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { width: 720, height: 1040 } }, { rotate: 0 }],
        { base64: true }
      );
      const base64Data = await photoRotate.base64;
      console.log(this.props.screenProps.token)
      uploadImage(await base64Data, this.props.screenProps.token, () => this.setState({spinnerVisible: false}))
        .then(err => console.log("Hello"))
        .catch(err => {
          this.setState({spinnerVisible: false})
          console.log(err)
        });
    }
  };

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
