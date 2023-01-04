import { StatusBar } from 'expo-status-bar'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'

import LoginComponent from '../components/LoginComponent'

export default function Login({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const emailInputHandler = (enteredText) => {
    setEnteredEmail(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    setEnteredPassword(enteredText)
  }

  const loginButtonHandler = () => {
    console.log('Login: ', enteredEmail)
    console.log('Password: ', enteredPassword)

    // LOGIN FETCH
    fetch('http://dom.webitup.pl/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        console.log(response.status) // Will show you the status
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then(
        (result) => {
          console.log(result)
        },

        // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
        // nie w bloku catch(), aby nie przetwarzać błędów
        // mających swoje źródło w komponencie.
        (error) => {
          console.log('Lipa ')
          console.log(error)
        }
      )
  }

  const registerButtonHandler = () => {
    setEnteredEmail('')
    setEnteredPassword('')
    navigation.navigate('Register')
  }

  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Image
          source={require('../assets/images/BIJ.png')}
          style={styles.image}
        />

        <LoginComponent
          onChangeEmail={emailInputHandler}
          onChangePassword={passwordInputHandler}
          onClickLoginButton={loginButtonHandler}
          emailValue={enteredEmail}
          passwordValue={enteredPassword}
        />

        <View style={styles.registerTextContainer}>
          <Text style={{ color: '#C1DAFF' }}>Nie masz konta? </Text>
          <Pressable onPress={registerButtonHandler} hitSlop={20}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Zarejestruj się
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '25%',
    alignItems: 'center',
  },
  image: {
    width: '45%',
    height: '45%',
    marginBottom: '12%',
  },
  registerTextContainer: {
    flexDirection: 'row',
    paddingTop: '5%',
    paddingBottom: '20%',
  },
})
