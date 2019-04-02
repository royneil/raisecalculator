import React, { Component, useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import Header from '../../components/Header';
import Input from '../../components/Input/index'
import KeyBoard from '../../components/Keyboard';
import Constant from '../../utils/Constants'

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invest: '',
      equity: '',
      pre: '',
      post: '',
      currentFocus: 'invest'
    }
  }

  clean = (obj) => {
    let newState = Object.assign({}, obj)
    delete newState['currentFocus']

    for (var propName in obj) { 
      if (newState[propName] === null || newState[propName] === undefined || newState[propName] === '') {
        delete newState[propName];
      }
    }
    return Object.keys(newState)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { invest, equity, pre, post, currentFocus } = this.state
    let newState = Object.assign({}, this.state)
  
    const currentKey = currentFocus
    const prevKey = prevState.currentFocus
    console.log('PREVSTATE', prevState)
    console.log('THIS STAE', this.state)

    if (this.state !== prevState) {
      // const cleanObj = this.clean(prevState)
      // if (cleanObj.length === 4 ) {
      //   const { currentFocus } = this.state

      //   const oldValue = this.state[currentFocus]
      //   const newState = Object.assign({
      //     invest: '',
      //     equity: '',
      //     pre: '',
      //     post: '',
      //     currentFocus: ''
      //   }, { [currentFocus]: oldValue, currentFocus })

      //   this.setState({
      //     invest: newState.invest,
      //     equity: newState.equity,
      //     pre: newState.pre,
      //     post: newState.post,
      //     currentFocus: newState.currentFocus
      //   })
      // }
    this.calculations(prevState)
    }
  };

  calculations = prevState => {
    const { invest, equity, pre, post, currentFocus } = this.state
    let newState = Object.assign({}, this.state)
  
    const currentKey = currentFocus
    const prevKey = prevState.currentFocus
   
    switch (`${prevKey}, ${currentKey}`) {
      case "invest, equity":

        newState.post = (parseFloat(invest) / parseFloat(equity)) * 100
        newState.pre = parseFloat(newState.post) - parseFloat(invest)

        console.log('CHECK STATE', (parseFloat(newState.invest) / parseFloat(newState.equity)) * 100)
        break;
    
      default:
        break;
    }
    console.log("newState---->", newState)
  }
  

  setCurrentFocus = name => {
    this.setState({
      currentFocus: name
    })
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
  renderInvest = _ => {
    const { invest } = this.state
    return (
      <Input
        title='Invest'
        unit='$'
        onChangeText={text => this.setState({ invest: text })}
        ref={ref => this.investRef = ref}
        value={this.numberWithCommas(invest)}
        onSetCurrentFocus={this.setCurrentFocus}
        name='invest'
      />
    )
  }

  renderEquity = _ => {
    const { equity } = this.state
    let newEquity = equity.slice(0, (equity.indexOf('.'))+6)
    newEquity = this.numberWithCommas(newEquity)

    return (
      <Input
        title='Equity'
        unit='%'
        onChangeText={text => this.setState({ equity: text })}
        value={newEquity}
        ref={ref => this.equityRef = ref}
        onSetCurrentFocus={this.setCurrentFocus}
        name='equity'
        ref={ref => this.equityRef = ref}
      />
    )
  }

  renderPre = _ => {
    const { pre } = this.state
    let newPre = pre.slice(0, (pre.indexOf('.')) + 10)
    newPre = this.numberWithCommas(newPre)

    return (
      <Input
        title='Pre'
        unit='$'
        onChangeText={text => this.setState({ pre: text })}
        onSetCurrentFocus={this.setCurrentFocus}
        value={newPre}
        name='pre'
        ref={ref => this.preRef = ref}
      />
    )
  }

    renderPost = _ => {
    const { post, } = this.state
    let newPost = post.slice(0, (post.indexOf('.')) + 10)
    newPost = this.numberWithCommas(newPost)
    return (
      <Input
        title='Post'
        unit='$'
        onChangeText={text => this.setState({ post: text })}
        value={newPost}
        onSetCurrentFocus={this.setCurrentFocus}
        name='post'
        ref={ref => this.postRef = ref}
      />
    )
  }
  

  onClearValue = _ => {
    this.setState({
      invest: '',
      equity: '',
      pre: '',
      post: '',
    })
  }

  onPressHandler = number => {
    const { currentFocus } = this.state
    const prevNumber = this.state[currentFocus] || ""
    this.setState({ [currentFocus]: prevNumber + String(number)})
  }

  onDeleteHandler = _ => {
    const { currentFocus } = this.state
    const prevNumber = this.state[currentFocus] || ""
    this.setState(prevState => {
      return {[currentFocus]: prevState[currentFocus].slice(0, -1)}
    })
  }
  calculation = () => {
    const cleanObj = this.clean(this.state)
    const { invest, equity, pre, post, currentFocus } = this.state

    let newState = Object.assign({}, this.state)
    delete newState['currentFocus']
  
    if  (cleanObj.length >= 2) {
      console.log('CHECK CLEARN OBJ', cleanObj)
      switch (cleanObj.join(', ')) {
        case "invest, equity":
          newState.post = (parseFloat(invest) / parseFloat(equity)) * 100
          newState.pre = parseFloat(newState.post) - parseFloat(invest)
          break;
        case "invest, pre":
          newState.post = parseFloat(invest) +  parseFloat(pre)
          newState.equity = (parseFloat(invest) / parseFloat(newState.post)) * 100
          break;
        case "invest, post":
          newState.equity = parseFloat(invest) / parseFloat(post)
          newState.pre = parseFloat(newState.post) - parseFloat(invest)
          break;
        case "pre, equity":
          break;
        case "pre, post":
          newState.invest = parseFloat(post) - parseFloat(pre)
          newState.equity = (parseFloat(newState.invest) / parseFloat(post)) * 100
        case "post, equity":
          newState.invest = parseFloat(post) * parseFloat(equity) * 100
          newState.pre = parseFloat(post) - parseFloat(newState.invest)
          break;
        default: /** "pre", "equity" **/
          // Alert.alert(
          //   'Wrong Value',
          //   'Please input again',
          //   [
          //     {
          //       text: 'OK',
          //       onPress: _ =>  this.setState({
          //         invest: '',
          //         equity: '',
          //         pre: '',
          //         post: '',
          //       }),
          //     },
          //   ],
          //   { cancelable: false }
          // )

          break;
      }

      let newPre = newState.pre.toString().slice(0, (newState.pre.toString().indexOf('.'))+ 11)
      let newPost = newState.post.toString().slice(0, (newState.post.toString().indexOf('.'))+ 11)
      this.setState({
        invest: newState.invest.toString(),
        equity: newState.equity.toString(),
        pre: newPre,
        post: newPost,
        currentFocus,
      })
      console.log("newState---->", newState)
    }
  }


  renderClearPart = _ => {
    return (
      <View style={styles.clearPartWrapper}>
        {/* Clear */}
        <TouchableOpacity
          onPress={_ => this.onClearValue()}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={_ => this.onDeleteHandler()}
        >
          <Text style={styles.clearText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Header>
          RAI$E
        </Header>
        <View style={styles.calculatorWrapper}>
        <View style={styles.inputWrapper}>
          {this.renderInvest()}
          {this.renderEquity()}
          {this.renderPre()}
          {this.renderPost()}
        </View>
          {this.renderClearPart()}
          <View style={styles.keyboardWrapper}>
             <KeyBoard
               onPress={num => this.onPressHandler(num)}
               onDelete={_ => this.onDeleteHandler()}
             />
          </View> 
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  calculatorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  inputWrapper: {
    flex: 3.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearPartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    letterSpacing: 1.5,
    fontSize: 17,
    fontWeight: 'normal',
    marginTop: 20,
  },
  clearText: {
    fontFamily: 'Rubik-BoldItalic',
    textTransform: 'uppercase',
  },
  deleteText: {
    fontFamily: 'Rubik-BoldItalic',
    textTransform: 'uppercase',
  },
  keyboardWrapper: {
    flex: 5,
  }
})

export default Calculator