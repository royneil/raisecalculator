import { createStackNavigator, createAppContainer } from 'react-navigation'
import CalculatorScreen from '../modules/Calculator/index'
import SplashScreen from '../components/SplashScreen/index'

const AppNavigation = createStackNavigator({
  Splash: SplashScreen,
  Calculator: CalculatorScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'Calculator'
})

export default createAppContainer(AppNavigation)
