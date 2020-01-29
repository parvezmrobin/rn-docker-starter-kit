/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 13, 2019
 */

import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, StyleSheet} from 'react-native';
import {Colors, Surface, Text, Title} from 'react-native-paper';
import globalStyle from '../styles';
import axios from 'axios';
import {Navigation} from 'react-native-navigation';
import {SERVER_URL, TOKEN} from 'react-native-dotenv';

export default class Location extends Component<
  {},
  {hasLocationPermission: Boolean, currentLocation: string, watchID: Number},
> {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.state = {
      hasLocationPermission: false,
      currentLocation: null,
      watchID: null,
    };
  }

  _onLocationUpdate = currentLocation => {
    const {latitude, longitude} = currentLocation.coords;
    const url = `${SERVER_URL}geocoding?token=${TOKEN}&lat=${latitude}&lng=${longitude}`;

    axios
      .get(url)
      .then(resp => this.setState({currentLocation: resp.data.address}))
      .catch(console.warn);
  };

  async componentDidAppear(): void {
    await this.requestLocationPermission();
    if (this.state.hasLocationPermission) {
      const watchID = Geolocation.watchPosition(
        this._onLocationUpdate,
        error => console.warn(error.code, error.message),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );

      this.setState({watchID});
    }
  }

  componentDidDisappear(): void {
    Geolocation.clearWatch(this.state.watchID);
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access Location Permission',
          message:
            'We need to access you location to assure your wife that you really are on duty.',
          buttonPositive: 'Go On',
        },
      );

      this.setState({
        hasLocationPermission: granted === PermissionsAndroid.RESULTS.GRANTED,
      });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const {currentLocation} = this.state;
    return (
      <Surface
        style={StyleSheet.compose(
          globalStyle.container,
          {justifyContent: 'center'},
        )}>
        <Title style={styles.cWhite}>Your Location</Title>
        {currentLocation ? (
          <Text
            style={StyleSheet.compose(
              styles.cWhite,
              styles.taCenter,
            )}>
            {currentLocation}
          </Text>
        ) : (
          <Text
            style={StyleSheet.compose(
              styles.cWhite,
              styles.taCenter,
            )}>
            Loading
          </Text>
        )}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  cWhite: {color: Colors.white},
  taCenter: {textAlign: 'center'},
});
