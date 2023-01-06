import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from 'react-native'

const LoginComponent = ({
  onChangeEmail,
  onChangePassword,
  onClickLoginButton,
  emailValue,
  passwordValue,
}) => {
  const emailInputHandler = (enteredText) => {
    onChangeEmail(enteredText)
  }
  const passwordInputHandler = (enteredText) => {
    onChangePassword(enteredText)
  }

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <View style={styles.inputEmailAndPasswordContainers}>
          <Image source={require('../assets/images/user-icon.png')} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#A1B7D8'}
            onChangeText={emailInputHandler}
            value={emailValue}
          />
        </View>

        <View style={styles.inputEmailAndPasswordContainers}>
          <Image
            source={require('../assets/images/password-icon.png')}
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
    width: '100%',
    justifyContent: 'space-between',
    height: 80,
  },
  inputEmailAndPasswordContainers: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#A1B7D8',
  },
  input: {
    width: '100%',
    marginLeft: 5,
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
