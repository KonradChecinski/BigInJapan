import { useState } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native'

const TableMenuComponent = ({
  modalVisible,
  setModalVisible,
  myTable,
}) => {

  const [isAdmin, setIsAdmin] = useState(false)
    

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        {
          setModalVisible(false)
        }
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            setModalVisible(false)
          }}
        >
          <Image
            source={require('../../assets/images/x_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Text style={styles.headerText}>
          {myTable ? 'Moja tablica' : 'Udostępniona tablica'}
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.tableInfoContainer}>
          <Image
            source={require('../../assets/images/table_name_icon.png')}
          />
          <Text style={styles.text}>Nazwa tablicy</Text>
        </View>

        <View>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.tableInfoContainer}>
          <Image
            source={require('../../assets/images/table_owner_icon.png')}
          />
          <Text style={styles.text}>Właściciel tablicy</Text>
        </View>

        <View>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.tableInfoContainer}>
          <Image
            source={require('../../assets/images/table_members_icon.png')}
          />
          <Text style={styles.text}>Członkowie</Text>
        </View>

        <View style={styles.membersInputContainer}>
          <TextInput style={styles.membersInput} editable={false} />
          <Pressable
            style={styles.permissionsInput}
            hitSlop={30}
            onPress={() => setIsAdmin(!isAdmin)}
          >
            <TextInput style={{color: 'white', textAlign: 'center'}} editable={false} value={isAdmin ? "Admin" : "Zwykły"} />
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default TableMenuComponent

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
    padding: 40,
    backgroundColor: '#1E1E1E',
  },
  tableInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 15,
    color: '#C1DAFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 5,
    backgroundColor: '#303D52',
    color: 'white',
    borderWidth: 2,
    borderColor: '#A1B7D8',
    borderRadius: 5,
  },
  membersInput: {
    width: '60%',
    marginBottom: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#303D52',
    color: 'white',
    borderRadius: 5,
  },
  membersInputContainer: {
    flexDirection: 'row',
  },
  permissionsInput: {
    width: '36%',
    marginBottom: 20,
    padding: 5,
    backgroundColor: '#303D52',
    borderWidth: 2,
    borderColor: '#A1B7D8',
    borderRadius: 5,
  },
})
