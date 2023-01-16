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
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TaskMenuComponent = ({
  taskMenuVisible,
  setTaskMenuVisible,

  taskName,
  taskDescription,
  taskDate,
  taskTime,
  taskPanel,

  setTaskNameState,
  setTaskDescriptionState,
  setPanelNameState,
  setTaskDateState,
  setTaskTimeState,
  newTask,
  taskOrder,
  setTaskOrderState,
  setPanelUpdated,
  panelUpdated,
  tableID,
  panelID,
  taskID,
  setTaskIDState,

  panels,
  setTableScreenUpdated,
  tableScreenUpdated,
}) => {
  const { getData, setIsLoading } = useContext(AuthContext)

  const [dropDown, setDropDown] = useState(panelID)
  const [orderChanged, setOrderChanged] = useState(false)

  const clearState = () => {
    setTaskNameState('')
    setTaskDescriptionState('')
    setPanelNameState('')
    setTaskDateState('')
    setTaskTimeState('')
    setTaskOrderState('')
    setTaskIDState(null)
  }

  const saveTask = () => {
    setIsLoading(true)
    if (!newTask) {
      getData(
        `/table/${tableID}/panel/${panelID}/task/${taskID}`,
        'PUT',
        {
          name: taskName,
          description: taskDescription,
          datetime: taskDate + ' ' + taskTime,
          color: '000000',
          marker: 0,
        }
      ).then((response) => {
        console.log(response)
        if (response.status === true) {
          ToastAndroid.show(
            'Zadanie zostało zapisane',
            ToastAndroid.LONG
          )
          setPanelUpdated(panelUpdated + 1)
        } else {
          ToastAndroid.show(
            'Coś poszło nie tak, sprawdź połączenie z siecią',
            ToastAndroid.LONG
          )
        }
      })

      if (orderChanged) {
        getData(
          `/table/${tableID}/panel/${panelID}/task/${taskID}/changeOrder`,
          'PUT',
          {
            order: taskOrder,
          }
        ).then((response) => {
          console.log(response)
          if (response.status !== true) {
            ToastAndroid.show(
              'Coś poszło nie tak, sprawdź połączenie z siecią',
              ToastAndroid.LONG
            )
          } else {
            setPanelUpdated(panelUpdated + 1)
            console.log('c')
          }
        })
      }

      if (panelID !== dropDown) {
        getData(
          `/table/${tableID}/panel/${panelID}/task/${taskID}/changePanel`,
          'PUT',
          {
            panelId: dropDown,
          }
        ).then((response) => {
          console.log(response)
          if (response.status !== true) {
            ToastAndroid.show(
              'Coś poszło nie tak, sprawdź połączenie z siecią',
              ToastAndroid.LONG
            )
          } else {
            // setPanelUpdated(panelUpdated + 1)
            setTableScreenUpdated(tableScreenUpdated + 1)
          }
        })
      }
    } else {
      if (
        taskName !== '' &&
        taskDescription !== '' &&
        taskDate !== '' &&
        taskTime !== ''
      ) {
        console.log({
          path: `/table/${tableID}/panel/${panelID}/task`,
          name: taskName,
          description: taskDescription,
          datetime: taskDate + ' ' + taskTime,
          color: '000000',
          marker: 0,
        })
        getData(`/table/${tableID}/panel/${panelID}/task`, 'POST', {
          name: taskName,
          description: taskDescription,
          datetime: taskDate + ' ' + taskTime,
          color: '000000',
          marker: 0,
        }).then((response) => {
          console.log(response)
          if (response.status === true) {
            ToastAndroid.show(
              'Zadanie zostało utworzone',
              ToastAndroid.LONG
            )
            setPanelUpdated(panelUpdated + 1)
            clearState()
            setTaskMenuVisible(false)
          } else {
            ToastAndroid.show(
              'Coś poszło nie tak, sprawdź połączenie z siecią',
              ToastAndroid.LONG
            )
          }
        })
      } else {
        ToastAndroid.show(
          'Uzupełnij wszystkie pola',
          ToastAndroid.LONG
        )
      }
    }
    setIsLoading(false)
  }
  const deleteTask = () => {
    getData(
      `/table/${tableID}/panel/${panelID}/task/${taskID}`,
      'DELETE'
    ).then((response) => {
      if (response.status === true) {
        console.log(response)
        ToastAndroid.show(
          'Zadanie zostało usunięte',
          ToastAndroid.LONG
        )
        setPanelUpdated(panelUpdated + 1)
        setTaskMenuVisible(false)
        clearState()
      } else {
        ToastAndroid.show(
          'Coś poszło nie tak, sprawdź połączenie z siecią',
          ToastAndroid.LONG
        )
      }
    })
  }

  const taskNameInputHandler = (enteredText) => {
    setTaskNameState(enteredText)
  }
  const taskDescriptionInputHandler = (enteredText) => {
    setTaskDescriptionState(enteredText)
  }
  const taskPanelInputHandler = (enteredText) => {
    setPanelNameState(enteredText)
  }
  const taskDateInputHandler = (enteredText) => {
    setTaskDateState(enteredText)
  }
  const taskTimeInputHandler = (enteredText) => {
    setTaskTimeState(enteredText)
  }
  const taskOrderInputHandler = (enteredText) => {
    setTaskOrderState(enteredText)
    setOrderChanged(true)
  }

  return (
    <Modal
      animationType="slide"
      visible={taskMenuVisible}
      onRequestClose={() => {
        {
          setTaskMenuVisible(false)
          clearState()
        }
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            setTaskMenuVisible(false)
            clearState()
          }}
        >
          <Image
            source={require('../assets/images/x_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Text style={styles.headerText}>
          {newTask ? 'Dodaj zadanie' : 'Modyfikuj zadanie'}
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>Zadanie</Text>
          <TextInput
            style={styles.input}
            onChangeText={taskNameInputHandler}
            value={taskName}
          />

          <Text style={styles.text}>Opis</Text>
          <TextInput
            multiline={true}
            style={[styles.input, styles.inputBig]}
            onChangeText={taskDescriptionInputHandler}
            value={taskDescription}
          />

          {!newTask && (
            <>
              <Text style={styles.text}>Panel</Text>
              <View style={{ marginBottom: 10, marginTop: 5 }}>
                {/* {console.log(
              panels.find((object) => {
                return object.id === panelID
              }).name
            )} */}

                <SelectDropdown
                  buttonStyle={styles.dropdown4BtnStyle}
                  buttonTextStyle={styles.dropdown4BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={
                          isOpened ? 'chevron-up' : 'chevron-down'
                        }
                        color={'#A1B7D8'}
                        size={18}
                      />
                    )
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown4DropdownStyle}
                  rowStyle={styles.dropdown4RowStyle}
                  rowTextStyle={styles.dropdown4RowTxtStyle}
                  data={panels}
                  // defaultValue={
                  // panels.find((object) => {
                  //   return object.id === panelID
                  // }).name
                  // }
                  defaultValueByIndex={
                    panels.find((object) => {
                      return object.id === panelID
                    }).order - 1
                  }
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setDropDown(selectedItem.id)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.name
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.name
                  }}
                />
              </View>
            </>
          )}

          <Text style={styles.text}>Termin</Text>
          <View
            style={[styles.dateInfoContainer, { marginBottom: 0 }]}
          >
            <Image
              style={styles.icon}
              source={require('../assets/images/date_icon.png')}
            />
            <TextInput
              style={[styles.input, { width: '90%' }]}
              placeholder={'YYYY-MM-DD'}
              placeholderTextColor="white"
              onChangeText={taskDateInputHandler}
              keyboardType={'numeric'}
              value={taskDate}
            />
          </View>

          <View style={styles.dateInfoContainer}>
            <Image
              style={styles.icon}
              source={require('../assets/images/time_icon.png')}
            />
            <TextInput
              style={[styles.input, { width: '90%' }]}
              placeholder={'HH:MM'}
              placeholderTextColor={'white'}
              onChangeText={taskTimeInputHandler}
              keyboardType={'numbers-and-punctuation'}
              value={taskTime}
            />
          </View>

          {!newTask && (
            <>
              <Text style={[styles.text, { marginTop: 10 }]}>
                Kolejność
              </Text>
              <TextInput
                style={styles.input}
                placeholder={'Wpisz liczbę od 0 w górę'}
                placeholderTextColor={'white'}
                keyboardType={'numeric'}
                onChangeText={taskOrderInputHandler}
                value={taskOrder.toString()}
              />
            </>
          )}

          <View style={{ marginTop: 40 }}>
            <MenuButtonComponent
              text={'Zapisz'}
              color={'#E6B77D'}
              onPressButton={saveTask}
            />
            {!newTask && (
              <MenuButtonComponent
                text={'Usuń zadanie'}
                color={'#435571'}
                onPressButton={deleteTask}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default TaskMenuComponent

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
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    backgroundColor: '#1E1E1E',
  },
  content: {
    width: '100%',
  },
  dateInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    color: '#C1DAFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#303D52',
    color: 'white',
    borderWidth: 2,
    borderColor: '#A1B7D8',
    borderRadius: 5,
  },
  inputBig: {
    height: '15%',
    textAlignVertical: 'top',
  },
  icon: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
  },
  members: {
    width: '100%',
    marginBottom: 100,
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: '#444',
    borderBottomColor: '#C5C5C5',
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#303D52',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#A1B7D8',
  },
  dropdown4BtnTxtStyle: { color: 'white', textAlign: 'left' },
  dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown4RowStyle: {
    backgroundColor: '#303D52',
    borderBottomColor: '#C5C5C5',
  },
  dropdown4RowTxtStyle: { color: 'white', textAlign: 'left' },
})
