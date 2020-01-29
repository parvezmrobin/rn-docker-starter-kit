/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 08, 2019
 */

import {init as initScreens, Layout, navigate} from './screens';
const {Navigation} = require('react-native-navigation');

export const start = function() {
  Navigation.events().registerAppLaunchedListener(async () => {
    await initScreens();
    await Navigation.setRoot({
      root: {sideMenu: Layout},
    }).catch(console.warn);
    Navigation.mergeOptions('Sidebar', {
      topBar: {
        title: {text: 'Go To'},
      },
    });

    await navigate.to.home();
  });
  Navigation.events().registerNavigationButtonPressedListener(async e => {
    if (e.buttonId === 'sideMenu') {
      navigate.sidebar.show();
    } else if (e.buttonId === 'homeMenu') {
      await navigate.to.home();
    } else {
      throw new Error(`Unknown navigation buttonId: ${e.buttonId}`);
    }
  });
};
