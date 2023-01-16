import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import AddButtonComponent from '../components/AddButtonComponent'
import PanelMenuComponent from '../components/PanelMenuComponent'
import PanelComponent from '../components/PanelComponent'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContex'

export default function TableScreen({ route, navigation }) {
  const [panelMenuVisible, setPanelMenuVisible] = useState(false)
  const [panels, setPanels] = useState(null)
  const [panelName, setPanelName] = useState('')
  const [newPanel, setNewPanel] = useState('')
  const [panelIDState, setPanelIDState] = useState('')
  const [panelOrder, setPanelOrder] = useState('')
  const { getData } = useContext(AuthContext)
  const { tableID, tableName } = route.params
  const [tableScreenUpdated, setTableScreenUpdated] = useState(0)

  navigation.setOptions({ title: tableName })

  const fetchPanels = () => {
    getData(`/table/${tableID}/panel`, 'GET').then((response) => {
      setPanels(response.result)
      console.log(response.result)
      console.log(panels)
    })
  }
  useEffect(() => {
    console.log('useEffect z TableScreen')
    fetchPanels()
  }, [tableScreenUpdated])

  const addButtonHandler = () => {
    setNewPanel(true)
    setPanelMenuVisible(true)
  }

  const loaderOrEmpty = (data) => {
    if (data === []) {
      return <></>
    } else
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            opacity: 0.3,
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )
  }

  return (
    <>
      <StatusBar style="light" />
      {console.log('render')}

      <PanelMenuComponent
        panelMenuVisible={panelMenuVisible}
        setPanelMenuVisible={setPanelMenuVisible}
        setPanelName={setPanelName}
        setPanelOrder={setPanelOrder}
        panelName={panelName}
        panelOrder={panelOrder}
        newPanel={newPanel}
        tableID={tableID}
        panelID={panelIDState}
        setPanelIDState={setPanelIDState}
        setTableScreenUpdated={setTableScreenUpdated}
        tableScreenUpdated={tableScreenUpdated}
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
                    tableID={tableID}
                    setPanelMenuVisible={setPanelMenuVisible}
                    loaderOrEmpty={loaderOrEmpty}
                    setPanelName={setPanelName}
                    setPanelOrder={setPanelOrder}
                    setNewPanel={setNewPanel}
                    setPanelIDState={setPanelIDState}
                    panels={panels}
                    setTableScreenUpdated={setTableScreenUpdated}
                    tableScreenUpdated={tableScreenUpdated}
                  />
                )
              })}
            </>
          ) : (
            loaderOrEmpty(panels)
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
