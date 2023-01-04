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
  const [enteredLogin, setEnteredLogin] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const loginInputHandler = (enteredText) => {
    setEnteredLogin(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    setEnteredPassword(enteredText)
  }

  const loginButtonHandler = () => {
    console.log('Login: ', enteredLogin)
    console.log('Password: ', enteredPassword)
  }

  const registerButtonHandler = () => {
    setEnteredLogin('')
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
          onChangeLogin={loginInputHandler}
          onChangePassword={passwordInputHandler}
          onClickLoginButton={loginButtonHandler}
          loginValue={enteredLogin}
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
