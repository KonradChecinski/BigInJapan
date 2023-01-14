import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'

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

  const getData = async (path, method, body = {}) => {
    return new Promise((resultPromise) => {
      setIsLoading(true)

      let args = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }
      if (method !== 'GET') {
        args.body = JSON.stringify(body)
      }

      fetch(`http://dom.webitup.pl/api${path}`, args)
        .then((response) => {
          console.log(`Status: ${response.status}`) // Will show you the status
          if (!response.ok) {
            if (response.status !== 500)
              throw new Error('Response ' + response.json())
            else throw new Error('konrados')
          }
          return response.json()
        })
        .then(
          (result) => {
            resultPromise(result)
          },
          // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
          // nie w bloku catch(), aby nie przetwarzać błędów
          // mających swoje źródło w komponencie.
          (error) => {
            console.log(error)
            // ToastAndroid.show(
            //   'Hasło nieprawidłowe lub brak użytkownika',
            //   ToastAndroid.LONG
            // )
          }
        )
      setIsLoading(false)
    })
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        setIsLoading,
        userToken,
        getData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
