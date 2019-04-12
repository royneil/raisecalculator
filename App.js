/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import AppNavigation from './src/navigations/index'


export default class App extends Component {
  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 800)
  }
  render() {
      return (
        <View style={styles.container}>
          <AppNavigation />
        </View>
      );
    } 
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
