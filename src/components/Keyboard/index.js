import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Constant from '../../utils/Constants';

export default class KeyBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', '0', '000'],
    }
    this.onNumberPressHandler = this.onNumberPressHandler.bind(this)
    this.onDeletePressHandler = this.onDeletePressHandler.bind(this)
  }

  onNumberPressHandler(number) {
    if (this.props.onPress !== undefined 
            && this.props.onPress instanceof Function) {
      this.props.onPress(number)
    }
  }
  onDeletePressHandler() {
    if (this.props.onDelete !== undefined 
            && this.props.onDelete instanceof Function) {
      this.props.onDelete(this.state.passcode)
    }
  }
  render() {
    const { keys} = this.state
    return (
     <View style={styles.keyPad}>
        <View style={ styles.keyPadRow }>
          <KeyPadItem index={ keys[7] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[8] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[9] } onPress={ this.onNumberPressHandler } />
        </View>

        <View style={ styles.keyPadRow }>
          <KeyPadItem index={ keys[4] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[5] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[6] } onPress={ this.onNumberPressHandler } />
        </View>

        <View style={ styles.keyPadRow }>
          <KeyPadItem index={ keys[1] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[2] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[3] } onPress={ this.onNumberPressHandler } />
        </View>
        <View style={ styles.keyPadLastdRow }>
          <KeyPadItem index={ keys[10] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[11] } onPress={ this.onNumberPressHandler } />
          <KeyPadItem index={ keys[12] } onPress={ this.onNumberPressHandler } />
        </View>
       
     </View>
    )
  }
}

const styles = StyleSheet.create({
  keyPad: {
    flex: 0.9,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constant.colors.white,
  },
  keyPadRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Constant.colors.lightGray,
    borderBottomWidth: 1,

  },
  keyPadLastdRow: {
    flexDirection: 'row',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    marginTop: 30
  },
  keyPadItem: {
    flex: 1,
    alignItems: 'center',
  },
  keyPadText: {
    color: Constant.colors.darkerGray,
    fontFamily: 'Rubik-LightItalic',
    fontSize: 30,
  }
})

function KeyPadItem(props) {
  return (
    <TouchableOpacity
      disabled={ props.disabled }
      onPress={ () => props.onPress(props.index) }
      style={[
        styles.keyPadItem
      ]}
    >
      <View>
        <Text style={styles.keyPadText}>
          { props.index }
        </Text>
      </View>
    </TouchableOpacity>
  )
}