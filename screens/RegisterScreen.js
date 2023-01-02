import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'

export default function Login() {
  return (
    <>
      <StatusBar style="light" />

      <View style={styles.container}>
        <Text>Register Screen</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
