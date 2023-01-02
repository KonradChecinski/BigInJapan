import { View, TextInput, StyleSheet, Text } from 'react-native'

const LoginComponent = () => {
  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email / Nazwa użytkownika"
          placeholderTextColor={'#A1B7D8'}
        />

        <TextInput
          style={styles.input}
          placeholder="Hasło"
          placeholderTextColor={'#A1B7D8'}
        />
      </View>

      <View style={styles.logInButtonContainer}>
        <Text
          style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        >
          Zaloguj się
        </Text>
      </View>
    </View>
  )
}

// #161A1D

export default LoginComponent

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    marginBottom: 75,
    width: 300,
    height: 150,
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
    marginTop: 60,
    alignSelf: 'center',
  },
})
