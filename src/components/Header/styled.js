import { StyleSheet } from 'react-native'
import Constant from '../../utils/Constants'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: Constant.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: '100%',
    height: '100%'
  }
})

export default styles