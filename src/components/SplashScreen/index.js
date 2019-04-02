import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constant from '../../utils/Constants'

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SPLASH SCREEN</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.colors.white,
  },

})
