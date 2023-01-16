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
import PanelMenuComponent from '../components/PanelMenuComponent'
import TaskMenuComponent from '../components/TaskMenuComponent'
import PanelComponent from '../components/PanelComponent'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContex'

export default function TableScreen({ route, navigation }) {
  const [panelMenuVisible, setPanelMenuVisible] = useState(false)
  const [taskMenuVisible, setTaskMenuVisible] = useState(false)
  // const [myTable, setMyTable] = useState(true)
  // const [newTable, setNewTable] = useState(false)
  // const [tableIdState, setTableIdState] = useState(null)
  // const { getData } = useContext(AuthContext)
  const [panels, setPanels] = useState(null)
  const { getData } = useContext(AuthContext)
  const { tableID, tableName, tablePermission } = route.params

  navigation.setOptions({ title: tableName })

  const fetchPanels = () => {
    getData(`/table/${tableID}/panel`, 'GET').then((response) => {
      console.log('useEffect z TableScreen')
      console.log(response.result)
      setPanels(response.result)
    })
  }
  useEffect(() => {
    fetchPanels()
  }, [])

  const addButtonHandler = () => {
    setPanelMenuVisible(true)
  }

  const loaderOrEmpty = () => {
    if (panels === []) {
      return <></>
    } else
      return (
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
      )
  }

  return (
    <>
      <StatusBar style="light" />

      <PanelMenuComponent
        panelMenuVisible={panelMenuVisible}
        setPanelMenuVisible={setPanelMenuVisible}
      />
      <TaskMenuComponent
        taskMenuVisible={taskMenuVisible}
        setTaskMenuVisible={setTaskMenuVisible}
      />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView style={styles.listContainer}>
          {/* Tu będą panele */}
          {panels ? (
            <>
              {panels.map((panel) => {
                return (
                  <PanelComponent
                    key={panel.id}
                    panelID={panel.id}
                    panelName={panel.name}
                    panelOrder={panel.order}
                    setTaskMenuVisible={setTaskMenuVisible}
                    setPanelMenuVisible={setPanelMenuVisible}
                  />
                )
              })}
            </>
          ) : (
            loaderOrEmpty()
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
  listContainer: {
    marginTop: 25,
  },
  addButton: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
})
