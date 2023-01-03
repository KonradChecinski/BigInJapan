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
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Hasło</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Powtórz hasło</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
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

        <View style={styles.registerButtonContainer}>
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
    height: '50%',
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
    marginTop: '13%',
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
    paddingTop: '5%',
    paddingBottom: '20%',
  },
})
