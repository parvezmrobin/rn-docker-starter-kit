/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 08, 2019
 */

import {View} from 'react-native';
import styles from '../styles';
import {Button} from 'react-native-paper';
import React, {Component} from 'react';

import {navigate} from '.';

export default class Home extends Component<> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          icon="camera"
          onPress={() => navigate.to.camera()}>
          Show Camera
        </Button>
        <Button
          mode="contained"
          icon="image"
          onPress={() => navigate.to.preview()}>
          Show Image
        </Button>
      </View>
    );
  }
}
