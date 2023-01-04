import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native'
import { useState } from 'react'

const LoginComponent = () => {
  //#region State of login and password, handling LOGIN button
  const [enteredLogin, setEnteredLogin] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const loginInputHandler = (enteredText) => {
    setEnteredLogin(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    setEnteredPassword(enteredText)
  }

  const loginButtonHandler = () => {
    console.log(enteredLogin)
    console.log(enteredPassword)
  }
  //#endregion

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email / Nazwa użytkownika"
          placeholderTextColor={'#A1B7D8'}
          onChangeText={loginInputHandler}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Hasło"
          placeholderTextColor={'#A1B7D8'}
          onChangeText={passwordInputHandler}
        />
      </View>

      <Pressable onPress={loginButtonHandler}>
        <View style={styles.logInButtonContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Zaloguj się
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default LoginComponent

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    marginBottom: '15%',
    width: '75%',
  },
  inputContainer: {
    justifyContent: 'space-between',
    height: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A1B7D8',
    color: 'white',
  },
  logInButtonContainer: {
    width: '100%',
    marginTop: '17%',
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#161A1D',
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#161A1D',
  },
})
