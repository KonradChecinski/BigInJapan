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
          style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
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
    marginBottom: 60,
    width: 300,
    height: 200,
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
    width: 300,
    marginTop: 50,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#161A1D',
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#161A1D',
  },
})
