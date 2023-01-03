import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Register({ navigation }) {
  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.main}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.allInputsContainer}>
          <View style={styles.inputContainer}>
            <Text>Nazwa użytkownika</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text>Hasło</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
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
    width: 300,
    height: 150,
    borderWidth: 1,
  },
  inputContainer: {
    justifyContent: 'space-between',
    width: 300,
    height: 75,
    borderWidth: 1,
  },
  input: {
    width: 300,
    borderWidth: 1,
  },
})
