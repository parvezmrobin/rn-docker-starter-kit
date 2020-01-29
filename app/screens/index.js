/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 12, 2019
 */
import ImagePreview from './ImagePreview';
import Camera from './Camera';
import Home from './Home';
import Location from './Location';
import {Layout as LayoutType, Navigation} from 'react-native-navigation';
import {getImageSource} from 'react-native-vector-icons/MaterialIcons';
import Register from './auth/Register';
import Login from './auth/Login';
import {connect, Provider} from 'react-redux';
import store from '../store';
import Sidebar from '../components/Sidebar';
import React, {Component} from 'react';

/**
 * To add a new screen —
 * 1. Add it to `Screens` object. If it is a public screen, add to `PublicScreens` too.
 * 2. Optionally create a `navigateTo.ScreenName` function to elegantly navigate
 *    using syntax `navigate.to.ScreenName()`. Otherwise, you have to navigate using
 *    syntax `navigate.to('ScreenName')`
 */

export const PublicScreens = {
  Register,
  Login,
};

export const Screens = {
  Home,
  Camera,
  Preview: ImagePreview,
  Location,
  ...PublicScreens,
};

// `Options` contains config option for each screen
let Options: Readonly;

async function _initScreenOptions() {
  const [homeIcon, menuIcon] = await Promise.all([
    getImageSource('home', 25),
    getImageSource('menu', 25),
  ]);

  const getOptionsFor: string => LayoutType = screenName => ({
    component: {
      name: screenName,
      options: {
        topBar: {
          title: {
            text: screenName,
          },
          leftButtons: [
            {
              id: 'sideMenu',
              icon: menuIcon,
            },
          ],
          rightButtons: [
            {
              id: 'homeMenu',
              icon: homeIcon,
            },
          ],
        },
      },
    },
  });

  Options = Object.keys(Screens).reduce((options, screen) => {
    options[screen] = getOptionsFor(screen);
    return options;
  }, {});
}

const _registerScreens = () => {
  class AuthComponent extends Component<{
    isPublicScreen: Boolean,
    isLoggedIn: Boolean,
  }> {
    render() {
      !(this.props.isPublicScreen || this.props.isLoggedIn) &&
        navigate.to.login();
      return this.props.children;
    }
  }

  const ConnectedAuthComponent = connect(state => ({
    isLoggedIn: !!state.auth.token,
  }))(AuthComponent);

  const ReduxProviderHoc = (Screen, isPublicScreen) => props => (
    <Provider store={store}>
      <ConnectedAuthComponent isPublicScreen={isPublicScreen}>
        <Screen {...props} />
      </ConnectedAuthComponent>
    </Provider>
  );

  for (const name in Screens) {
    Navigation.registerComponent(name, () =>
      ReduxProviderHoc(Screens[name], name in PublicScreens),
    );
  }
  Navigation.registerComponent('Sidebar', () =>
    ReduxProviderHoc(Sidebar, true),
  );
};

export const init = async () => {
  await _initScreenOptions();
  _registerScreens();
};

export const Layout = {
  left: {
    stack: {
      id: 'Sidebar',
      children: [{component: {name: 'Sidebar'}}],
    },
  },
  center: {
    stack: {
      id: 'HomeStack',
      options: {},
      children: [],
    },
  },
};

type NavigateToFuncObj = {
  (string): Promise,
  currentScreen: string,
  home: {(): Promise},
  camera: {(): Promise},
  preview: {(): Promise},
  register: {(): Promise},
  login: {(): Promise},
};

// this function MUST be called after `init` is called
const navigateTo: NavigateToFuncObj = async function(screenName) {
  // `Options` should be initialized at this point
  if (!(screenName in Options)) {
    throw new Error(`Invalid screen name: ${screenName}`);
  }
  if (navigateTo.currentScreen === screenName) {
    return null;
  }
  navigateTo.currentScreen = screenName;
  await Navigation.push('HomeStack', Options[screenName]);
};

// `Options` should be initialized at this point
navigateTo.home = async () => await navigateTo('Home');
navigateTo.camera = async () => await navigateTo('Camera');
navigateTo.preview = async () => await navigateTo('Preview');
navigateTo.register = async () => await navigateTo('Register');
navigateTo.login = async () => await navigateTo('Login');

export const navigate = {
  to: navigateTo,
  sidebar: {
    changeVisibility(visible) {
      return Navigation.mergeOptions('Sidebar', {
        sideMenu: {
          left: {
            visible,
          },
        },
      });
    },
    show() {
      this.changeVisibility(true);
    },
    hide() {
      this.changeVisibility(false);
    },
  },
};
