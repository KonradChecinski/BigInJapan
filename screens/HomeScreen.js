import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContex'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import TableContainerComponent from '../components/homeScreenComponents/TableContainerComponent'
import AddButtonComponent from '../components/AddButtonComponent'

export default function HomeScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <StatusBar style="light" />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView>
          <TableContainerComponent myTables={true} />
          <TableContainerComponent myTables={false} />
        </ScrollView>
      </LinearGradient>

      <View style={styles.addButton}>
        <AddButtonComponent inTableView={true} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
})
