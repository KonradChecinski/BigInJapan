import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function Privacy({ navigation }) {
  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.main}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView style={styles.privacyContainer}>
          <Text style={{ color: 'white' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Suscipit voluptates at sed temporibus veritatis, quos a
            fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Suscipit voluptates at sed temporibus veritatis,
            quos a fugit doloribus magnam odit quas neque consequuntur
            doloremque? Natus quisquam sapiente excepturi magni
            facere.
          </Text>
        </ScrollView>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  privacyContainer: {
    width: '80%',
    marginBottom: '30%',
    padding: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#C1DAFF',
  },
})
