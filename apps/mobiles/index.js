/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/auth';

if (!firebase.apps.length) {
  console.log('exist fb');
} else {
  console.log('none');
}

AppRegistry.registerComponent(appName, () => App);
