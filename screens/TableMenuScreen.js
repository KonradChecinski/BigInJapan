import { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import { AuthContext } from '../context/AuthContex'

import MembersInputComponent from '../components/MembersInputComponent'
import MenuButtonComponent from '../components/MenuButtonComponent'

const TableMenuScreen = ({ route, navigation }) => {
  const [tableName, setTableName] = useState('')
  const [tableOwner, setTableOwner] = useState('')
  const [tableMembers, setTableMembers] = useState(null)

  const { getData } = useContext(AuthContext)

  const { myTable, newTable, tableIdState } = route.params

  const tableNameInputHandler = (enteredText) => {
    setTableName(enteredText)
  }

  const getTableInfo = () => {
    if (!newTable) {
      console.log(newTable)
      console.log('getTableInfo if')
      getData(`/table/info/${tableIdState}`, 'GET').then(
        (response) => {
          console.log('getData1')
          setTableName(response.result.tableName)
          setTableOwner(response.result.tableOwner.full_name)
        }
      )
      getData(`/table/shared/${tableIdState}`, 'GET').then(
        (response) => {
          console.log('getData2')
          console.log(response.result)
          setTableMembers(response.result)
        }
      )
    } else return
  }

  useEffect(() => {
    console.log('useEffect Menu Component')
    getTableInfo()
  }, [])

  return (
    <>
      <View style={styles.header}>
        <Pressable
          style={styles.x_icon}
          hitSlop={30}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            source={require('../assets/images/x_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Text style={styles.headerText}>
          {myTable ? 'Moja tablica' : 'Udostępniona tablica'}
        </Text>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.tableInfoContainer}>
            <Image
              source={require('../assets/images/table_name_icon.png')}
            />
            <Text style={styles.text}>Nazwa tablicy</Text>
          </View>

          <View>
            {myTable && (
              <TextInput
                style={styles.input}
                onChangeText={tableNameInputHandler}
                value={tableName}
              />
            )}
          </View>
          <View>
            {!myTable && (
              <TextInput
                style={[styles.input, { borderColor: '#1E1E1E' }]}
                editable={false}
                value={tableName}
              />
            )}
          </View>

          <View style={styles.tableInfoContainer}>
            <Image
              source={require('../assets/images/table_owner_icon.png')}
            />
            <Text style={styles.text}>Właściciel tablicy</Text>
          </View>

          {/* <View>
            {myTable && (
              <TextInput
                style={styles.input}
                onChangeText={tableOwnerInputHandler}
                value={tableOwner}
              />
            )}
          </View> */}
          <View>
            <TextInput
              style={[styles.input, { borderColor: '#1E1E1E' }]}
              editable={false}
              value={tableOwner}
            />
          </View>

          <View style={styles.tableInfoContainer}>
            <Image
              source={require('../assets/images/table_members_icon.png')}
            />
            <Text style={styles.text}>Członkowie</Text>
          </View>

          <View style={styles.members}>
            {tableMembers ? (
              <>
                {tableMembers.map((member) => {
                  if (member.permission !== 2) {
                    return (
                      <MembersInputComponent
                        key={member.unique_name}
                        myTable={myTable}
                        tableID={tableIdState}
                        uniqueName={member.unique_name}
                        tick={false}
                        memberName={member.full_name}
                        memberPermission={member.permission}
                      />
                    )
                  }
                })}
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

            {myTable && (
              <MenuButtonComponent
                text={'Zaproś'}
                color={'#C1DAFF'}
              />
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {myTable && (
            <MenuButtonComponent text={'Zapisz'} color={'#E6B77D'} />
          )}
          {!newTable && myTable && (
            <MenuButtonComponent
              text={'Usuń tablicę'}
              color={'#435571'}
            />
          )}
          {!myTable && (
            <MenuButtonComponent
              text={'Opuść tablicę'}
              color="#435571"
            />
          )}
        </View>
      </View>
    </>
  )
}

export default TableMenuScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
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
    top: '135%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 40,
    backgroundColor: '#1E1E1E',
  },
  content: {
    marginBottom: 50,
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
