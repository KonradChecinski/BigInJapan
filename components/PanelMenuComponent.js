import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native'
import React, { useContext, useState } from 'react'
import MenuButtonComponent from './MenuButtonComponent'
import { AuthContext } from '../context/AuthContex'

const PanelMenuComponent = ({
  panelMenuVisible,
  setPanelMenuVisible,

  setPanelName,
  setPanelOrder,
  panelName,
  panelOrder,
  newPanel,

  tableID,
  panelID,
  setPanelIDState,

  setTableScreenUpdated,
  tableScreenUpdated,
}) => {
  const { getData, setIsLoading } = useContext(AuthContext)

  const clearState = () => {
    setPanelName('')
    setPanelOrder('')
    setPanelIDState(null)
  }

  const panelNameInputHandler = (enteredText) => {
    setPanelName(enteredText)
  }
  const panelOrderInputHandler = (enteredText) => {
    setPanelOrder(enteredText)
  }

  const savePanel = () => {
    setIsLoading(true)
    if (!newPanel) {
      getData(`/table/${tableID}/panel/${panelID}`, 'PUT', {
        name: panelName,
        order: panelOrder,
      }).then((response) => {
        console.log(response)
        if (response.status === true) {
          ToastAndroid.show(
            'Panel został zapisany',
            ToastAndroid.LONG
          )
          setTableScreenUpdated(tableScreenUpdated + 1)
        } else {
          ToastAndroid.show(
            'Coś poszło nie tak, sprawdź połączenie z siecią',
            ToastAndroid.LONG
          )
        }
      })
    } else {
      if (panelName !== '') {
        console.log(panelName)
        getData(`/table/${tableID}/panel`, 'POST', {
          name: panelName,
        }).then((response) => {
          console.log(response)
          if (response.status === true) {
            ToastAndroid.show(
              'Panel został utworzony',
              ToastAndroid.LONG
            )
            setTableScreenUpdated(tableScreenUpdated + 1)
            clearState()
            setPanelMenuVisible(false)
          } else {
            ToastAndroid.show(
              'Coś poszło nie tak, sprawdź połączenie z siecią',
              ToastAndroid.LONG
            )
          }
        })
      } else {
        ToastAndroid.show('Podaj nazwę panelu', ToastAndroid.LONG)
      }
    }
    setIsLoading(false)
  }
  const deletePanel = () => {
    getData(`/table/${tableID}/panel/${panelID}`, 'DELETE').then(
      (response) => {
        if (response.status === true) {
          console.log(response)
          ToastAndroid.show(
            'Panel został usunięty',
            ToastAndroid.LONG
          )
          setTableScreenUpdated(tableScreenUpdated + 1)
          setPanelMenuVisible(false)
          clearState()
        } else {
          ToastAndroid.show(
            'Coś poszło nie tak, sprawdź połączenie z siecią',
            ToastAndroid.LONG
          )
        }
      }
    )
  }

  return (
    <Modal
      animationType="slide"
      visible={panelMenuVisible}
      onRequestClose={() => {
        {
          setPanelMenuVisible(false)
          clearState()
        }
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            setPanelMenuVisible(false)
            clearState()
          }}
        >
          <Image
            source={require('../assets/images/x_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Text style={styles.headerText}>
          {newPanel ? 'Dodaj panel' : 'Modyfikuj panel'}
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.panelInfoContainer}>
            <Text style={styles.text}>Nazwa</Text>
            <TextInput
              style={styles.input}
              onChangeText={panelNameInputHandler}
              value={panelName}
            />
            {!newPanel && (
              <>
                <Text style={[styles.text, { marginTop: 10 }]}>
                  Kolejność
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Wpisz liczbę od 0 w górę'}
                  placeholderTextColor={'white'}
                  keyboardType={'numeric'}
                  onChangeText={panelOrderInputHandler}
                  value={panelOrder.toString()}
                />
              </>
            )}
          </View>

          <View>
            <MenuButtonComponent
              text={'Zapisz'}
              color={'#E6B77D'}
              onPressButton={savePanel}
            />
            {!newPanel && (
              <MenuButtonComponent
                text={'Usuń panel'}
                color={'#435571'}
                onPressButton={deletePanel}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PanelMenuComponent

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#435571',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C1DAFF',
  },
  x_icon: {
    position: 'absolute',
    left: '5%',
    top: '75%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 40,
    backgroundColor: '#1E1E1E',
  },
  content: {
    justifyContent: 'space-between',
    height: '45%',
    marginBottom: 50,
  },
  panelInfoContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 10,
  },
  text: {
    marginBottom: 5,
    color: '#C1DAFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#303D52',
    color: 'white',
    borderWidth: 2,
    borderColor: '#A1B7D8',
    borderRadius: 5,
  },
  members: {
    width: '100%',
    marginBottom: 100,
  },
})
