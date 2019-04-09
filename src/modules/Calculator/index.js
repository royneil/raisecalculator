import React, { Component, useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import _ from 'lodash';
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
      currentFocus: 'invest',
      previousFocus: '',
      isCalculating: false,
    }
  }
  
  clean = (obj) => {
    let newState = Object.assign({}, obj)
    delete newState['currentFocus']
    delete newState['previousFocus']
    delete newState['isCalculating']
    for (var propName in obj) { 
      if (newState[propName] === null || newState[propName] === undefined || newState[propName] === '') {
        delete newState[propName];
      }
    }
    return Object.keys(newState)
  }

  componentDidUpdate = (prevProps, prevState) => {
  
    if (this.state !== prevState) {
      const { post } = this.state
      const cleanObj = this.clean(this.state)
      if (cleanObj.length >= 2 && this.state.isCalculating) {
        this.calculations(prevState)
      }
    }
  };

  checkIncluding = (items, key1, key2) => {
    return items.includes(key1) && items.includes(key2)
  }

  convertExpo = n => {
    var [lead,decimal,pow] = n.toString().split(/e|\./);
    return +pow <= 0 
        ? "0." + "0".repeat(Math.abs(pow)-1) + lead + decimal
        : lead + ( +pow >= decimal.length ? (decimal + "0".repeat(+pow-decimal.length)) : (decimal.slice(0,+pow)+"."+decimal.slice(+pow)))
  }

  roundNumber = number => {
    const isExpo = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)/g
    if (isExpo.test(number)) {
      return this.convertExpo(number)
    }

    return newNumber = Number(Math.round(number + 'e2') + 'e-2')
  }

  addZero = number => {
    const dotIndex = number.indexOf('.')

    if (dotIndex > -1) {
      const subString = number.substring(dotIndex + 1, number.length)
      if (subString && subString.length === 1 && subString !== '.') {
        return number + '0'
      }
    }
    return number
  }

  removeArray(arr, items) {
    return arr.filter(function(ele){
        return !items.includes(ele)
    });
 }

  calculations = prevState => {
    const { invest, equity, pre, post, currentFocus, previousFocus } = this.state
    let newState = Object.assign({}, this.state)
  
    const currentKey = currentFocus
    const prevKey = previousFocus

    const items = [currentKey, prevKey]

    if (this.checkIncluding(items, 'invest', 'equity')) {
      if (invest.length && equity.length) {
       
       let newPost = (parseFloat(invest) / parseFloat(equity)) * 100
       let newPre = parseFloat(newPost) - parseFloat(invest)
       
       newPost = this.roundNumber(newPost)
       newPre = this.roundNumber(newPre)
       if (newPost % 1 === 0 ) {
         newPost = parseInt(newPost)
       }
       if (newPre % 1 === 0) {
         newPre = parseInt(newPre)
       }

      newPost = newPost.toString()
      newPre = newPre.toString()
      
        newState.post = newPost
        newState.pre = newPre
      }
    } else if (this.checkIncluding(items, 'invest', 'pre')) {

      if (invest.length && pre.length) {
        let newPost = parseFloat(invest) + parseFloat(pre)
        let newEquity = (parseFloat(invest) / parseFloat(newPost)) * 100
        newPost = this.roundNumber(newPost)
        newEquity = this.roundNumber(newEquity)
        if (newPost % 1 === 0) {
          newPost = parseInt(newPost)
        }
        if (newEquity % 1 === 0) {
          newEquity = parseInt(newEquity)
        }

        newPost = newPost.toString()
        newEquity = newEquity.toString()

        newState.post = newPost
        newState.equity = newEquity
      }


    } else if (this.checkIncluding(items, 'invest', 'post')) {
      if (invest.length && post.length) {

        let newEquity = (parseFloat(invest) / parseFloat(post)) * 100
        let newPre = parseFloat(newState.post) - parseFloat(invest)
        
        newEquity = this.roundNumber(newEquity)
        newPre = this.roundNumber(newPre)
        
        if (newEquity % 1 === 0) {
          newEquity = parseInt(newEquity)
        }
        if (newPre % 1 === 0) {
          newPre = parseInt(newPre)
        }
        newState.equity =  newEquity.toString()
        newState.pre = newPre.toString()
      }
    }
    else if (this.checkIncluding(items, 'equity', 'pre')) {
    
      if (equity.length && pre.length) {
        let newPost = 100 * parseFloat(pre) / (100 - parseFloat(equity))
        let newInvest = (parseFloat(equity) * parseFloat(newPost)) / 100
        
        newPost = this.roundNumber(newPost)
        newInvest = this.roundNumber(newInvest)
        if (newPost % 1 === 0) {
          newPost = parseInt(newPost)
        }
        if (newInvest % 1 === 0) {
          newInvest = parseInt(newInvest)
        }
        newPost = newPost.toString()
        newInvest = newInvest.toString()

        newState.post = newPost
        newState.invest = newInvest
      }
    }
    else if (this.checkIncluding(items, 'pre', 'post')) {
    
      if (pre.length && post.length) {
        let newInvest = parseFloat(post) - parseFloat(pre)
        let newEquity = (parseFloat(newInvest) / parseFloat(post)) * 100

        newInvest = this.roundNumber(newInvest)
        newEquity = this.roundNumber(newEquity)
        if (newInvest % 1 === 0) {
          newInvest = parseInt(newInvest)
        }
        if (newEquity % 1 === 0) {
          newEquity = parseInt(newEquity)
        }
        newInvest = newInvest.toString()
        newEquity = newEquity.toString()

        newState.invest = newInvest
        newState.equity = newEquity
      }
    }
    else if (this.checkIncluding(items, 'post', 'equity')) {
    if (post.length && equity.length) {

      let newInvest = (parseFloat(post) * parseFloat(equity)) / 100
      let newPre = parseFloat(post) - parseFloat(newInvest)

      newInvest = this.roundNumber(newInvest)
      newPre = this.roundNumber(newPre)

      if (newInvest % 1 === 0) {
        newInvest = parseInt(newInvest)
      }
      if (newPre % 1 === 0) {
        newPre = parseInt(newPre)
      }

      newInvest = newInvest.toString()
      newPre = newPre.toString()

      
      newState.invest = newInvest
      newState.pre = newPre
    }
    
    } else {
      console.log('Nothing')
    }

    let addZeroKeys = ['invest', 'equity', 'pre', 'post']
    addZeroKeys = this.removeArray(addZeroKeys, [currentFocus, previousFocus])

    for (let index = 0; index < addZeroKeys.length; index++) {
      let key = addZeroKeys[index]
      newState[key] = this.addZero(newState[key])
    }
      
    this.setState({
      invest: newState.invest.toString(),
      equity: newState.equity.toString(),
      pre: newState.pre.toString(),
      post: newState.post.toString(),
      currentFocus,
      isCalculating: false
    })
  }

  checkContainNumber = (currentFocus) => {
    const currentValue = this.state[currentFocus]
    return currentValue.length ? true : false
  }
  

  setCurrentFocus = name => {
    const { currentFocus, previousFocus } = this.state
    if (currentFocus !== name) {
      const newPrevFocus = this.checkContainNumber(currentFocus) ? currentFocus : previousFocus

      this.setState({
        currentFocus: name,
        previousFocus: newPrevFocus
      })
    }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  renderInvest = _ => {
    const { invest, currentFocus } = this.state
    let newInvest = this.numberWithCommas(invest)
    return (
      <Input
        title='Invest'
        unit='$'
        onChangeText={text => this.setState({ invest: text })}
        ref={ref => this.investRef = ref}
        value={newInvest}
        onSetCurrentFocus={this.setCurrentFocus}
        name='invest'
        style={{
          borderBottomColor: currentFocus === 'invest' ?  Constant.colors.black : Constant.colors.lightGray,
        }}  
      />
    )
  }

  renderEquity = _ => {
    const { equity, currentFocus } = this.state
    let newEquity = equity.slice(0, (equity.indexOf('.'))+ 10)
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
        style={{
          borderBottomColor: currentFocus === 'equity' ?  Constant.colors.black : Constant.colors.lightGray,
        }}  

      />
    )
  }

  renderPre = _ => {
    const { pre } = this.state
    let newPre = this.numberWithCommas(pre)

    return (
      <Input
        title='Pre'
        unit='$'
        onChangeText={text => this.setState({ pre: text })}
        onSetCurrentFocus={this.setCurrentFocus}
        value={newPre}
        name='pre'
        ref={ref => this.preRef = ref}
        style={{
          borderBottomColor: this.state.currentFocus === 'pre' ?  Constant.colors.black : Constant.colors.lightGray,
        }}  
      />
    )
  }


  renderPost = _ => {
    const { post } = this.state
    let newPost = this.numberWithCommas(post)
  
    return (
      <Input
        title='Post'
        unit='$'
        onChangeText={text => this.setState({ post: text })}
        value={newPost}
        onSetCurrentFocus={this.setCurrentFocus}
        name='post'
        ref={ref => this.postRef = ref}
        style={{
          borderBottomColor: this.state.currentFocus === 'post' ?  Constant.colors.black : Constant.colors.lightGray,
        }}  
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
    this.setState({ [currentFocus]: prevNumber + String(number), isCalculating: true })
  }

  onDeleteHandler = _ => {
    const { currentFocus } = this.state
    this.setState(prevState => {
      if (!this.state[currentFocus].slice(0, -1)) {
        const { previousFocus } = this.state
        const prevNumber = this.state[previousFocus]

        const newObj = Object.assign({
          invest: '',
          equity: '',
          pre: '',
          post: '',
          currentFocus: 'invest',
          previousFocus: '',
          isCalculating: false
        }, {currentFocus, previousFocus, [previousFocus]: prevNumber})
        
        return newObj
      } else {
        return {[currentFocus]: prevState[currentFocus].slice(0, -1), isCalculating: true }
      }
    })
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
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
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
    fontSize: 14
  },
  deleteText: {
    fontFamily: 'Rubik-BoldItalic',
    textTransform: 'uppercase',
    color: 'grey',
    fontSize: 14
  },
  keyboardWrapper: {
    flex: 5,
  }
})

export default Calculator