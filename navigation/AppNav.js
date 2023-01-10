import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext)

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#435571',
          opacity: 0.5,
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
