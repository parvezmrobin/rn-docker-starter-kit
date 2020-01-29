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
import {clearAuthError, register} from '../../actions/authActions';

const {Navigation} = require('react-native-navigation');

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      passwordError: '',
    };
  }

  componentDidAppear() {
    this.props.clearAuthError();
  }

  register = () => {
    Keyboard.dismiss();

    if (!this.state.password) {
      return this.setState({
        passwordError: 'Password should not be empty',
      });
    }
    if (this.state.password !== this.state.confirm) {
      return this.setState({
        passwordError: "Password and confirm password don't Match",
      });
    }
    this.setState({
      passwordError: '',
    });
    this.props.register(this.state.username, this.state.password);
  };

  render() {
    return (
      <Surface>
        <Card>
          <Card.Title
            title="Register"
            left={() => <IconButton icon="account-badge-outline" />}
          />
          <Card.Content>
            <TextInput
              label="Username"
              value={this.state.username}
              error={!!this.props.usernameError}
              onChangeText={username => this.setState({username})}
            />
            <HelperText type="error" visible={!!this.props.usernameError}>
              {this.props.usernameError}
            </HelperText>
            <TextInput
              label="Password"
              error={!!this.state.passwordError}
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
            <HelperText type="error" visible={!!this.state.passwordError}>
              {this.state.passwordError}
            </HelperText>
            <TextInput
              label="Confirm"
              error={!!this.state.passwordError}
              secureTextEntry
              value={this.state.confirm}
              onChangeText={confirm => this.setState({confirm})}
            />
          </Card.Content>
          <Card.Actions style={styles.mx8}>
            <Button mode="contained" onPress={this.register}>
              Register
            </Button>
            <Button
              style={styles.mlAuto}
              onPress={() => {
                this.props.clearAuthError();
                return navigate.to.login();
              }}>
              <Text
                style={StyleSheet.compose(
                  styles.cPrimary,
                  styles.ttNone,
                )}>
                Login
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
  state => ({usernameError: state.auth.error.username}),
  {register, clearAuthError},
)(Register);
