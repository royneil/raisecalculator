/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import Constant from './src/utils/Constants';
import AppNavigation from './src/navigations/index'

export default class App extends Component {
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
