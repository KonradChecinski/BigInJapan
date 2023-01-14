import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable, Image } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

import HomeScreen from '../screens/HomeScreen'
import TableScreen from '../screens/TableScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  const { logout } = useContext(AuthContext)

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Tablice',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerLeft: () => (
            <Pressable onPress={() => logout()} hitSlop={30}>
              <Image
                source={require('../assets/images/logoHeader.png')}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Table"
        component={TableScreen}
        options={{
          title: 'Tablica',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerLeft: () => (
            <Pressable onPress={() => logout()} hitSlop={30}>
              <Image
                source={require('../assets/images/logoHeader.png')}
              />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
