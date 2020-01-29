/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 08, 2019
 */

import {Image, View} from 'react-native';
import styles from '../styles';
import {Button} from 'react-native-paper';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {navigate} from '.';

class ImagePreview extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.imageUri}} style={styles.preview} />
        <Button
          mode="contained"
          icon="camera"
          onPress={() => navigate.to.camera()}>
          Show Camera
        </Button>
      </View>
    );
  }
}

export default connect(state => state.camera)(ImagePreview);
