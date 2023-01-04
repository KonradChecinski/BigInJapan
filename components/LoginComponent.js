import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native'

const LoginComponent = ({
  onChangeLogin,
  onChangePassword,
  onClickLoginButton,
  loginValue,
  passwordValue,
}) => {
  const loginInputHandler = (enteredText) => {
    onChangeLogin(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    onChangePassword(enteredText)
  }

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email / Nazwa użytkownika"
          placeholderTextColor={'#A1B7D8'}
          onChangeText={loginInputHandler}
          value={loginValue}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Hasło"
          placeholderTextColor={'#A1B7D8'}
          onChangeText={passwordInputHandler}
          value={passwordValue}
        />
      </View>

      <Pressable onPress={onClickLoginButton}>
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
