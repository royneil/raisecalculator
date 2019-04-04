import { createStackNavigator, createAppContainer } from 'react-navigation'
import CalculatorScreen from '../modules/Calculator/index'
import SplashScreen from '../components/SplashScreen/index'

const AppNavigation = createStackNavigator({
  Splash: SplashScreen,
  Calculator: CalculatorScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'Splash'
})

export default createAppContainer(AppNavigation)
