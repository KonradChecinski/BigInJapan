import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import AddButtonComponent from '../components/AddButtonComponent'
import ListMenuComponent from '../components/ListMenuComponent'
import ListComponent from '../components/ListComponent'
import { useState, useContext, useEffect } from 'react'

export default function TableScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  // const [myTable, setMyTable] = useState(true)
  // const [newTable, setNewTable] = useState(false)
  // const [tableIdState, setTableIdState] = useState(null)
  // const { getData } = useContext(AuthContext)

  //   const [tables, setTables] = useState(null)

  const { tableID, tableName, tablePermission } = route.params

  navigation.setOptions({ title: tableName })

  const fetchLists = () => {
    // getData('/table/get', 'GET').then((response) => {
    //   setTables(response.result)
    // })
  }
  useEffect(() => {
    fetchLists()
  }, [])

  const addButtonHandler = () => {
    setModalVisible(true)
  }

  return (
    <>
      <StatusBar style="light" />

      <ListMenuComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView style={styles.listContainer}>
          {/* Tu będą listy */}
          <ListComponent />
        </ScrollView>
      </LinearGradient>

      <View style={styles.addButton}>
        <AddButtonComponent onPressButton={addButtonHandler} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 25,
  },
  addButton: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
})
