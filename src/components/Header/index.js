import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styled'

export default class Header extends Component {
  render() {
    const {
      children,
      style,
    } = this.props
    return (
      <View style={[styles.header, style ]}>
        <Text style={styles.headerText}>
          {children}
        </Text>
      </View>
    )
  }
}