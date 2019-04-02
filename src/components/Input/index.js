import React, { Component, useEffect, useState, useRef } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native'
import Constant from '../../utils/Constants';

const Input = React.forwardRef((props, ref) => {

  const [inputs, setInput] = useState('') 

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <TextInput
          {...props}
          ref={ref}
          underlineColorAndroid={'transparent'}
          style={[
            styles.textInput,
            {
              borderBottomColor: inputs.isFocus ? Constant.colors.black : Constant.colors.lighterGray,
            }
          ]}
          keyboardType={'numeric'}
          onFocus={_ => {
            setInput({ isFocus: true })
            props.onSetCurrentFocus(props.name)
          }}
          onBlur={_ => setInput({ isFocus: false })}
        />

        <Text style={styles.unit}>{props.unit}</Text>
      </View>

    )
})

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  textInput: {
    borderStyle: 'solid',
    borderBottomWidth: 1.5,
    width: '100%',
    height: Platform.OS === 'ios' ? 45 : 50,
    paddingRight: 30,
    paddingLeft: 60,
    textAlign: 'right',
    fontFamily: 'Rubik-Medium',
    fontSize: 25
  },
  title: {
    fontFamily: 'Rubik-LightItalic',
    textTransform: 'uppercase',
    fontSize: 15,
    letterSpacing: 1,
    position: 'absolute',
    color: Constant.colors.black
  },
  unit: {
    textTransform: 'uppercase',
    fontSize: 21,
    position: 'absolute',
    right: 0,
    fontFamily: 'Rubik-Medium'
  }
})

export default Input