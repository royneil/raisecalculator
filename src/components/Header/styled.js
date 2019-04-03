import { StyleSheet } from 'react-native'
import Constant from '../../utils/Constants'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: Constant.colors.white
  },
  headerText: {
    color: Constant.colors.black,
    fontSize: 32,
    marginTop: 50,
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
    letterSpacing: 6,
  },
})

export default styles