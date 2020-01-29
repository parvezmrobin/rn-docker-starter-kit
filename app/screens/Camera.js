/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 08, 2019
 */

import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors, IconButton, Text} from 'react-native-paper';
import React, {Component} from 'react';
import styles from '../styles';
import {capture} from '../actions/cameraActions';
import {navigate} from '.';
import {connect} from 'react-redux';

const {Navigation} = require('react-native-navigation');

class Camera extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      focusedScreen: false,
    };
  }

  componentDidAppear() {
    this.setState({focusedScreen: true});
  }

  componentDidDisappear() {
    this.setState({focusedScreen: false});
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: true};
      const data = await this.camera.takePictureAsync(options);

      this.props.capture(data.uri);
      await navigate.to.preview();
    }
  };

  render() {
    const {focusedScreen} = this.state;
    const rnCamera = (
      <RNCamera
        ref={ref => (this.camera = ref)}
        style={styles.flex1}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        androidCameraPermissionOptions={null}>
        <View style={styles.captureButtonWrapper}>
          <IconButton
            icon="camera"
            size={36}
            color={Colors.amber50}
            onPress={this.takePicture}
          />
        </View>
      </RNCamera>
    );

    return (
      <View style={styles.flex1}>
        {focusedScreen ? rnCamera : <Text>Not focused</Text>}
      </View>
    );
  }
}

export default connect(
  null,
  {capture},
)(Camera);
