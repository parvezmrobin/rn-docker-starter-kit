/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 08, 2019
 */
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flex0: {flex: 0},
  container: {
    flex: 1,
    backgroundColor: Colors.deepPurpleA200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  preview: {flexGrow: 1, height: '75%', width: '100%'},
  captureButtonWrapper: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default styles;
