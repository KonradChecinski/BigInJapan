import { StatusBar } from 'expo-status-bar'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import { AuthContext } from '../context/AuthContex'

export default function Login({ navigation }) {
  const { login, setIsLoading } = useContext(AuthContext)

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const emailInputHandler = (enteredText) => {
    setEnteredEmail(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    setEnteredPassword(enteredText)
  }

  const loginButtonHandler = () => {
    // login()

    console.log('Login: ', enteredEmail)
    console.log('Password: ', enteredPassword)
    if (enteredEmail.length === 0 || enteredPassword.length === 0) {
      // TOAST
      ToastAndroid.show(
        'Uzupełnij wszystkie pola',
        ToastAndroid.SHORT
      )
      console.log('Uzupełnij wszystkie pola')
      return
    }

    setIsLoading(true)
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
        console.log(`Status: ${response.status}`) // Will show you the status
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then(
        (result) => {
          console.log(result.token)
          login(result.token)
        },
        // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
        // nie w bloku catch(), aby nie przetwarzać błędów
        // mających swoje źródło w komponencie.
        (error) => {
          console.log('Lipa ')
          console.log(error)
          ToastAndroid.show(
            'Hasło nieprawidłowe lub brak użytkownika',
            ToastAndroid.LONG
          )
        }
      )
    setIsLoading(false)
  }

  //  LOG  Email:  jan@gmail.com
  //  LOG  Password:  A1!aaaaaaa

  //  Email:  mamgier@gmail.com
  //  LOG  Password:  A1!aaaaa
  //  LOG  PasswordAgain:  A1!aaaaa
  //  LOG  Checkbox:  true
  //  LOG  Status: 200
  //  LOG  {"message": "User Created Successfully", "status": true, "token": "2|JItKXcnMEqvHAO5KgORjjrLLsaiXd3ZY6wMgpKFu"}

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
