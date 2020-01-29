/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 11, 2019
 */

import {Menu} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {navigate, Screens, PublicScreens} from '../screens';
import styles from '../styles';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';

const Sidebar = props => {
  const publicScreenNames = Object.keys(PublicScreens);
  const screenNames = props.isLoggedIn
    ? Object.keys(Screens).filter(screen => !publicScreenNames.includes(screen))
    : publicScreenNames;
  return (
    <View style={StyleSheet.flatten([styles.flex1, {backgroundColor: '#fff'}])}>
      {screenNames.map((screen, i) => (
        <Menu.Item
          key={i}
          title={screen}
          onPress={async () => {
            navigate.sidebar.hide();
            await navigate.to(screen);
          }}
          bottomDivider
        />
      ))}
      {props.isLoggedIn && (
        <Menu.Item
          key="logout"
          title="Logout"
          onPress={async () => {
            props.logout();
            navigate.sidebar.hide();
            await navigate.to.login();
          }}
        />
      )}
    </View>
  );
};

export default connect(
  state => ({isLoggedIn: !!state.auth.token}),
  {logout},
)(Sidebar);
