import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styled'

export default class Header extends Component {
  render() {
    const {
      children,
      style,
    } = this.props
    return (
      <View style={[styles.header, style ]}>
         <Image
          source={require('../../assets/logo/Logo.png')}
          resizeMode='contain' 
          style={styles.splash}
        />
      </View>
    )
  }
}