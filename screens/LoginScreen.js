import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import LoginComponent from '../components/LoginComponent'

export default function Login({ navigation }) {
  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Image
          source={require('../assets/images/BIJ.png')}
          style={styles.image}
        />

        <LoginComponent />

        <View style={styles.registerTextContainer}>
          <Text style={{ color: '#C1DAFF' }}>Nie masz konta? </Text>
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Register')}
          >
            Zarejestruj się
          </Text>
        </View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '25%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '45%',
    height: '45%',
    marginBottom: '12%',
  },
  registerTextContainer: {
    flexDirection: 'row',
    paddingTop: '5%',
    paddingBottom: '20%',
  },
})
