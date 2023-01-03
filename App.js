import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './screens/LoginScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import RegisterScreen from './screens/RegisterScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Utwórz konto',
            headerTintColor: '#C1DAFF',
            headerStyle: { backgroundColor: '#435571' },
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyPolicyScreen}
          options={{
            title: 'Polityka prywatności',
            headerTintColor: '#C1DAFF',
            headerStyle: { backgroundColor: '#435571' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
