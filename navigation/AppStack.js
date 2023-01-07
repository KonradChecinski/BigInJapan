import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ekran główny',
          headerTintColor: '#C1DAFF',
          headerStyle: { backgroundColor: '#435571' },
        }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
