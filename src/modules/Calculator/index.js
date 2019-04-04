import React, { Component, useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard
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
      currentFocus: 'invest',
      previousFocus: '',
      isCalculating: false
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

  checkIncluding =(items, key1, key2) => {
    return items.includes(key1) && items.includes(key2)
  }

  calculations = prevState => {
    const { invest, equity, pre, post, currentFocus, previousFocus } = this.state
    let newState = Object.assign({}, this.state)
  
    const currentKey = currentFocus
    const prevKey = previousFocus

    const items = [currentKey, prevKey]

    if (this.checkIncluding(items, 'invest', 'equity')) {
      if (parseFloat(invest) > 0 && parseFloat(equity) > 0) {
       
       let newPost = (parseFloat(invest) / parseFloat(equity)) * 100
       let newPre = parseFloat(newPost) - parseFloat(invest)
       if (invest.length === 1 && equity.length >= 2) {
         newPost = newPost.toString().slice(0, (newPost.toString().indexOf('.')) + 3)
         newPre = newPre.toString().slice(0, (newPre.toString().indexOf('.')) + 3)
       }
        newState.post = newPost
        newState.pre = newPre
      }
    } else if (this.checkIncluding(items, 'invest', 'pre')) {

      newState.post = parseFloat(invest) +  parseFloat(pre)

      let newEquity = (parseFloat(invest) / parseFloat(newState.post)) * 100
      newEquity = newEquity.toString().slice(0, (newEquity.toString().indexOf('.')) + 5)
      newState.equity = newEquity

    } else if (this.checkIncluding(items, 'invest', 'post')) {
      if (parseFloat(invest) > 0 && parseFloat(post) > 0) {
        let newEquity = (parseFloat(invest) / parseFloat(post)) * 100
        newEquity = newEquity.toString().slice(0, (newEquity.toString().indexOf('.')) + 7)
        newState.equity = newEquity
        newState.pre = parseFloat(newState.post) - parseFloat(invest)
      }
    }
    else if (this.checkIncluding(items, 'equity', 'pre')) {
      if (parseFloat(equity) > 0 && parseFloat(equity) > 0) {
        let newPost = 100 * parseFloat(pre) / (100 - parseFloat(equity))
        newPost = newPost.toString().slice(0, (newPost.toString().indexOf('.')) + 3)
        newState.post = newPost
        let newInvest = (parseFloat(equity) * parseFloat(newState.post)) / 100
        newState.invest = newInvest.toString().slice(0, (newInvest.toString().indexOf('.')) + 3)
      }
    }
    else if (this.checkIncluding(items, 'pre', 'post')) {
      if (parseFloat(pre) > 0 && parseFloat(post) > 0) {
        newState.invest = parseFloat(post) - parseFloat(pre)

        let newEquity = (parseFloat(newState.invest) / parseFloat(post)) * 100
        newEquity = newEquity.toString().slice(0, (newEquity.toString().indexOf('.')) + 4)
        newState.equity = newEquity
      }
    }
    else if (this.checkIncluding(items, 'post', 'equity')) {
      newState.invest = (parseFloat(post) * parseFloat(equity)) / 100
      newState.pre = parseFloat(post) - parseFloat(newState.invest)
    } else {
      console.log('Nothing')
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
  

  setCurrentFocus = name => {
    const { currentFocus } = this.state
    if (currentFocus !== name) {
      this.setState({
        currentFocus: name,
        previousFocus: currentFocus
      })
    }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
  renderInvest = _ => {
    const { invest } = this.state
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
          borderBottomColor: this.state.currentFocus === 'invest' ?  Constant.colors.black : Constant.colors.lighterGray,
        }}  
      />
    )
  }

  renderEquity = _ => {
    const { equity } = this.state
    let newEquity = equity.slice(0, (equity.indexOf('.'))+ 10)
    newEquity = this.numberWithCommas(newEquity)

    return (
      <Input
        title='Equity'
        unit='%'
        onChangeText={text => this.setState({ equity: text })}
        value={equity}
        ref={ref => this.equityRef = ref}
        onSetCurrentFocus={this.setCurrentFocus}
        name='equity'
        ref={ref => this.equityRef = ref}
        style={{
          borderBottomColor: this.state.currentFocus === 'equity' ?  Constant.colors.black : Constant.colors.lighterGray,
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
          borderBottomColor: this.state.currentFocus === 'pre' ?  Constant.colors.black : Constant.colors.lighterGray,
        }}  
      />
    )
  }

  renderPost = _ => {
    const { post, } = this.state
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
          borderBottomColor: this.state.currentFocus === 'post' ?  Constant.colors.black : Constant.colors.lighterGray,
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