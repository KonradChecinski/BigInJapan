import { View, Text, StyleSheet, Button } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'

export default function HomeScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Button
        title="Wyloguj"
        onPress={() => {
          logout()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
