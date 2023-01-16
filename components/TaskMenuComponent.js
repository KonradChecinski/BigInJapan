import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native'
import React from 'react'
import MenuButtonComponent from './MenuButtonComponent'

const TaskMenuComponent = ({
  taskMenuVisible,
  setTaskMenuVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={taskMenuVisible}
      onRequestClose={() => {
        {
          setTaskMenuVisible(false)
          //   clearState()
        }
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            setTaskMenuVisible(false)
            // clearState()
          }}
        >
          <Image
            source={require('../assets/images/x_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Text style={styles.headerText}>
          {/* {myTable ? 'Moja tablica' : 'Udostępniona tablica'} */}
          Task Name
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>Zadanie</Text>
          <TextInput
            style={styles.input}
            // onChangeText={tableNameInputHandler}
            // value={tableName}
          />

          <Text style={styles.text}>Opis</Text>
          <TextInput
            multiline={true}
            style={[styles.input, styles.inputBig]}
            // onChangeText={tableNameInputHandler}
            // value={tableName}
          />

          <Text style={styles.text}>Lista</Text>
          <TextInput
            style={styles.input}
            // onChangeText={tableNameInputHandler}
            // value={tableName}
          />

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
              // onChangeText={tableNameInputHandler}
              // value={tableName}
            />
          </View>

          <View style={styles.dateInfoContainer}>
            <Image
              style={styles.icon}
              source={require('../assets/images/time_icon.png')}
            />
            <TextInput
              style={[styles.input, { width: '90%' }]}
              placeholder="HH:MM"
              placeholderTextColor="white"
              // onChangeText={tableNameInputHandler}
              // value={tableName}
            />
          </View>

          <View style={{ marginTop: 100 }}>
            <MenuButtonComponent text={'Zapisz'} color={'#E6B77D'} />
            <MenuButtonComponent
              text={'Usuń listę'}
              color={'#435571'}
            />
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
    height: 120,
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
})
