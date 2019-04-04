import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'

export default class SplashScreen extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.navigation.navigate('Calculator')
    }, 3000)
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={_ => this.props.navigation.navigate('Calculator')}
        activeOpacity={1}
      >
        <Image
          source={require('../../assets/splash/Splash_Screen.png')}
          resizeMode='contain' 
          style={styles.splash}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13192e',
  },
  splash: {
    width: '100%',
    height: '100%'
  }
})
