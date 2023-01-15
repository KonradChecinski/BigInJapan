import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import TableContainerComponent from '../components/TableContainerComponent'
import AddButtonComponent from '../components/AddButtonComponent'
import { useState, useContext, useEffect, useReducer } from 'react'
import TableMenuComponent from '../components/TableMenuComponent'
import { AuthContext } from '../context/AuthContex.js'

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [myTable, setMyTable] = useState(true)
  const [newTable, setNewTable] = useState(false)
  const [tableIdState, setTableIdState] = useState(null)
  const { getData } = useContext(AuthContext)
  const [tables, setTables] = useState(null)
  const [homeScreenChanged, setHomeScreenChanged] = useState(0)

  const fetchTables = () => {
    getData('/table/get', 'GET').then((response) => {
      setTables(response.result)
      // console.log(response.result)
    })
  }
  useEffect(() => {
    console.log('useEffect z HomeScreen')
    fetchTables()
  }, [tableIdState, homeScreenChanged])

  const addButtonHandler = () => {
    setTableIdState(null)
    setMyTable(true)
    setNewTable(true)
    setModalVisible(true)
  }

  return (
    <>
      <StatusBar style="light" />

      <TableMenuComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        myTable={myTable}
        newTable={newTable}
        tableIdState={tableIdState}
        setTableIdState={setTableIdState}
        homeScreenChanged={homeScreenChanged}
        setHomeScreenChanged={setHomeScreenChanged}
      />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView>
          {tables ? (
            <>
              <TableContainerComponent
                isShared={false}
                setMyTable={setMyTable}
                setNewTable={setNewTable}
                tables={tables[0]}
                setTableIdState={setTableIdState}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
              <TableContainerComponent
                isShared={true}
                setMyTable={setMyTable}
                setNewTable={setNewTable}
                tables={tables[1]}
                setTableIdState={setTableIdState}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                opacity: 0.5,
              }}
            >
              <ActivityIndicator size={'large'} />
            </View>
          )}
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
  addButton: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
})
