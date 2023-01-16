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

const PanelMenuComponent = ({
  panelMenuVisible,
  setPanelMenuVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={panelMenuVisible}
      onRequestClose={() => {
        {
          setPanelMenuVisible(false)
          //   clearState()
        }
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            setPanelMenuVisible(false)
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
          Panel Name
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.panelInfoContainer}>
            <Text style={styles.text}>Nazwa</Text>
            <TextInput
              style={styles.input}
              // onChangeText={tableNameInputHandler}
              // value={tableName}
            />
          </View>

          <View>
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
