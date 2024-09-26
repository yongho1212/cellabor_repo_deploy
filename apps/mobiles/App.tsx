/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {RecoilRoot} from 'recoil';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const Stack = createStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.red,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
// const App: React.FC = () => {
//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="SignUp" component={SignUpScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// };

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '49009639394-gp467256jk4m54sd2v3446r9m2doij8p.mobiles.googleusercontent.com',
      offlineAccess: true,
    });
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RecoilRoot>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <SignUpScreen />
            <LoginScreen />

            {/* <Section title="22222222">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
