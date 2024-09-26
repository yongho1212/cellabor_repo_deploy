// firebase.ts
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrya8vCLiyjiN7xoDmrsxeA93qhXXJCSQ',
  authDomain: 'cellabor-ad333.firebaseapp.com',
  projectId: 'cellabor-ad333',
  storageBucket: 'cellabor-ad333.appspot.com',
  messagingSenderId: '249009639394',
  appId: '1:249009639394:web:9e9c0ce128c13ec141f3bb',
  measurementId: 'G-38H3CDXCLJ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log(firebase, 'firebase');
}

export {firebase};
