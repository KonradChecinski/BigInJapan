import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const login = (token) => {
    setIsLoading(true)
    setUserToken(token)
    AsyncStorage.setItem('userToken', token)
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
      value={{ login, logout, isLoading, setIsLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
