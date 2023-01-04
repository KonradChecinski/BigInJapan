import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox'
import { useState } from 'react'

export default function Register({ navigation }) {
  const [isChecked, setChecked] = useState(false)

  const [enteredLogin, setEnteredLogin] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPasswordAgain, setEnteredPasswordAgain] = useState('')

  const loginInputHandler = (enteredText) => {
    setEnteredLogin(enteredText)
  }
  const emailInputHandler = (enteredText) => {
    setEnteredEmail(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    setEnteredPassword(enteredText)
  }
  const passwordAgainInputHandler = (enteredText) => {
    setEnteredPasswordAgain(enteredText)
  }

  const registerButtonHandler = () => {
    console.log('Login: ', enteredLogin)
    console.log('Email: ', enteredEmail)
    console.log('Password: ', enteredPassword)
    console.log('PasswordAgain: ', enteredPasswordAgain)
    console.log('Checkbox: ', isChecked)

    // REGISTER FETCH
    // fetch('http://dom.webitup.pl/api/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: enteredLogin,
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   }), // body data type must match "Content-Type" header
    // })
    //   .then((response) => {
    //     console.log(response.status) // Will show you the status
    //     if (!response.ok) {
    //       throw new Error('HTTP status ' + response.status)
    //     }
    //     return response.json()
    //   })
    //   .then(
    //     (result) => {
    //       console.log(result)
    //     },

    //     // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
    //     // nie w bloku catch(), aby nie przetwarzać błędów
    //     // mających swoje źródło w komponencie.
    //     (error) => {
    //       console.log('Lipa ')
    //       console.log(error)
    //     }
    //   )

    // TESTOWY FETCH - WYSYŁANIE TOKENA - OD RAZU PO URUCHOMIENIU APLIKACJI
    fetch('http://dom.webitup.pl/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:
          'Bearer 3|rSZZq72D2Xwb4li15fLHmEjfs1JYRiR1xSMOTkLI',
      },
      // body: JSON.stringify({
      //   name: enteredLogin,
      //   email: enteredEmail,
      //   password: enteredPassword,
      // }), // body data type must match "Content-Type" header
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

  // 3|rSZZq72D2Xwb4li15fLHmEjfs1JYRiR1xSMOTkLI
  //   Login:  Akdjj
  //  LOG  Email:  jan@gmail.com
  //  LOG  Password:  A1!aaaaaaa

  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.main}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.6 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.allInputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Nazwa użytkownika</Text>
            <TextInput
              style={styles.input}
              onChangeText={loginInputHandler}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={emailInputHandler}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Hasło</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={passwordInputHandler}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Powtórz hasło</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={passwordAgainInputHandler}
            ></TextInput>
          </View>
        </View>

        <View style={styles.infoAndCheckBox}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={'#C1DAFF'}
          />
          <Text style={styles.info}>
            Wyrażam zgodę na przetwarzanie moich danych osobowych
            przez tę aplikację.
          </Text>
        </View>

        <View style={styles.privacyPolicy}>
          <Pressable
            onPress={() => navigation.navigate('Privacy')}
            hitSlop={20}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Polityka prywatności
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.registerButtonContainer}
          onPress={registerButtonHandler}
        >
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Zarejestruj się
            </Text>
          </View>
        </Pressable>

        <View style={styles.logInTextContainer}>
          <Text style={{ color: '#C1DAFF' }}>Masz już konto? </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            hitSlop={20}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Zaloguj się
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  allInputsContainer: {
    justifyContent: 'space-between',
    width: '75%',
    // height: '50%',
    height: 360,
  },
  inputContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: '21%',
  },
  input: {
    width: '100%',
    height: '75%',

    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1DAFF',
    color: 'white',
    paddingLeft: 10,
  },
  text: {
    color: '#A1B7D8',
  },
  infoAndCheckBox: {
    flexDirection: 'row',
    width: '75%',
    marginTop: '10%',
  },
  checkbox: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    borderRadius: 5,
  },
  info: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#A1B7D8',
  },
  privacyPolicy: {
    marginTop: '2%',
  },
  registerButtonContainer: {
    width: '75%',
    marginTop: '10%',
    padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#161A1D',
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#161A1D',
  },
  logInTextContainer: {
    flexDirection: 'row',
    paddingTop: '10%',
    paddingBottom: '20%',
  },
})
