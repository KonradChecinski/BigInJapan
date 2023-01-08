import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const login = () => {
    setIsLoading(true)
    setUserToken('3|rSZZq72D2Xwb4li15fLHmEjfs1JYRiR1xSMOTkLI')
    AsyncStorage.setItem(
      'userToken',
      '3|rSZZq72D2Xwb4li15fLHmEjfs1JYRiR1xSMOTkLI'
    )
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let userToken = await AsyncStorage.getItem('userToken')
      setUserToken(userToken)
      setIsLoading(false)
    } catch (error) {
      console.log(`isLoggedIn() error: ${error}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
