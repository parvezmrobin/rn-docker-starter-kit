/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 15, 2019
 */

import React, {Component} from 'react';
import {
  Button,
  Card,
  HelperText,
  IconButton,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import styles from './styles';
import {navigate} from '../index';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import {login, clearAuthError} from '../../actions/authActions';

const {Navigation} = require('react-native-navigation');

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  // if componentDidMount is used it clearAuthError first then show screen, it makes screen appearing slow
  // NB: componentDidMount should be called only once for a single screen in App's runtime.
  componentDidAppear() {
    this.props.clearAuthError();
  }

  login = () => {
    Keyboard.dismiss();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <Surface>
        <Card>
          <Card.Title title="Login" left={() => <IconButton icon="login" />} />
          <Card.Content>
            <TextInput
              label="Username"
              error={!!this.props.error}
              value={this.state.username}
              onChangeText={username => this.setState({username})}
            />
            <HelperText type="error" visible={!!this.props.error}>
              {this.props.error}
            </HelperText>
            <TextInput
              label="Password"
              error={!!this.props.error}
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
          </Card.Content>
          <Card.Actions style={styles.mx8}>
            <Button mode="contained" onPress={this.login}>
              Login
            </Button>
            <Button
              style={styles.mlAuto}
              onPress={() => {
                this.props.clearAuthError();
                return navigate.to.register();
              }}>
              <Text
                style={StyleSheet.compose(
                  styles.cPrimary,
                  styles.ttNone,
                )}>
                Register
              </Text>{' '}
              <Text style={styles.ttNone}>Instead</Text>
            </Button>
          </Card.Actions>
        </Card>
      </Surface>
    );
  }
}

export default connect(
  state => ({error: state.auth.error.username}),
  {login, clearAuthError},
)(Login);
