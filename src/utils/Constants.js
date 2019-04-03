// Dimensions
import { Platform, Dimensions } from 'react-native'

export const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

const getNavPadding = () => {
  if (isIphoneX()) {
    return 40
  } else if (Platform.OS === 'ios') {
    return 20
  }
  return 0
}

export default {
  colors: {
    primary: '#231f20',
    white: '#fff',
    black: '#13192E',
    lighterGray: 'rgba(19, 25, 46, 0.4)',
    darkerGray: 'rgba(19, 25, 46, 0.4)',
  },
  layout: {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    navPadding: getNavPadding(),
  },
}