import React, { useState } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Platform,
  Keyboard,
  NativeModules
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
              props.style,
            ]}
            keyboardType={'numeric'}
            onFocus={_ => {
              Keyboard.dismiss()
              if (Platform.OS === 'android') {
                NativeModules.KeyboardFunctionalities.hideKeyboard()
              }
              setInput({ isFocus: true })
              props.onSetCurrentFocus(props.name) 
              
            }}
              onBlur={_ => {
                Keyboard.dismiss()
                setInput({ isFocus: false })
              }}
              contextMenuHidden={true}
              returnKeyType={'next'}
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
    borderBottomWidth: 1,
    width: '100%',
    height: Platform.OS === 'ios' ? 45 : 50,
    paddingRight: 30,
    paddingLeft: 60,
    textAlign: 'right',
    fontSize: 25,
    fontFamily: 'Rubik-Medium'
  },
  title: {
    fontFamily: 'Rubik-LightItalic',
    textTransform: 'uppercase',
    fontSize: 13,
    letterSpacing: 1,
    position: 'absolute',
    color: Constant.colors.black
  },
  unit: {
    textTransform: 'uppercase',
    fontSize: 20,
    position: 'absolute',
    right: 0,
    fontFamily: 'Rubik-Medium'
  }
})

export default Input
