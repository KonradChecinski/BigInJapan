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
import { useState, useContext, useEffect } from 'react'
import TableMenuComponent from './TableMenuScreen'
import { AuthContext } from '../context/AuthContex.js'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useNavigationState } from '@react-navigation/native'

export default function TableScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [myTable, setMyTable] = useState(true)
  const [newTable, setNewTable] = useState(false)
  const [tableIdState, setTableIdState] = useState(null)
  const { getData } = useContext(AuthContext)

  //   const [tables, setTables] = useState(null)

  const { tableID, tableName, tablePermission } = route.params

  navigation.setOptions({ title: tableName })

  // const fetchTables = () => {
  //   getData('/table/get', 'GET').then((response) => {
  //     setTables(response.result)
  //   })
  // }
  // useEffect(() => {
  //   fetchTables()
  // }, [])

  return (
    <>
      <StatusBar style="light" />

      {/* <TableMenuComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        myTable={myTable}
        newTable={newTable}
        tableIdState={tableIdState}
      /> */}

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView>
          {/* {tables ? (
              <>
                <TableContainerComponent
                  isShared={false}
                  setMyTable={setMyTable}
                  setModalVisible={setModalVisible}
                  setNewTable={setNewTable}
                  tables={tables[0]}
                  setTableIdState={setTableIdState}
                />
                <TableContainerComponent
                  isShared={true}
                  setMyTable={setMyTable}
                  setModalVisible={setModalVisible}
                  setNewTable={setNewTable}
                  tables={tables[1]}
                  setTableIdState={setTableIdState}
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
            )} */}
        </ScrollView>
      </LinearGradient>

      {/* <View style={styles.addButton}>
        <AddButtonComponent
          setModalVisible={setModalVisible}
          setMyTable={setMyTable}
          setNewTable={setNewTable}
        />
      </View> */}
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
