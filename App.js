import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  )
}
