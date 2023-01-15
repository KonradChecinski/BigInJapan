import { useNavigationState } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native'
import { AuthContext } from '../context/AuthContex'

const MembersInputComponent = ({
  myTable,
  memberName,
  uniqueName,
  tick,
  memberPermission,
  tableID,
  menuChanged,
  setMenuChanged,
  setNewMemberVisible,
}) => {
  const [isAdmin, setIsAdmin] = useState(0)
  const { getData } = useContext(AuthContext)

  const [newMemberID, setNewMemberID] = useState('')
  const newMemberIDInputHandler = (enteredText) => {
    setNewMemberID(enteredText)
  }

  useEffect(() => {
    memberPermission && setIsAdmin(1)
  }, [tableID])

  const onPressPermissionHandler = () => {
    isAdmin ? setIsAdmin(0) : setIsAdmin(1)

    if (!tick) {
      console.log('korad')
      console.log(tableID)

      getData(`/table/shared/${tableID}`, 'PUT', {
        user: uniqueName,
        permission: isAdmin,
      }).then((response) => {
        console.log(response.result)
      })
    }
  }

  const onPressTickHandler = () => {
    console.log('TICK')
    console.log(`Unique_name: ${newMemberID}`)

    if (newMemberID !== '') {
      getData(`/table/share`, 'POST', {
        user: newMemberID,
        idTable: tableID,
        permission: isAdmin,
      }).then((response) => {
        console.log(response)
        if (response.status === true) {
          ToastAndroid.show(
            'Użytkownik został dodany',
            ToastAndroid.SHORT
          )
          setMenuChanged(menuChanged + 1)
          setNewMemberVisible(false)
        } else {
          ToastAndroid.show(
            'Coś poszło nie tak, sprawdź połączenie z siecią',
            ToastAndroid.LONG
          )
        }
      })
    } else {
      ToastAndroid.show('Podaj nazwę członka', ToastAndroid.LONG)
    }
  }

  const onPressXHandler = () => {
    console.log('X')

    getData(`/table/shared/${tableID}`, 'DELETE', {
      user: uniqueName,
    }).then((response) => {
      console.log(response)
      if (response.status === true) {
        ToastAndroid.show(
          'Członek został usunięty',
          ToastAndroid.SHORT
        )
        setMenuChanged(menuChanged + 1)
      } else {
        ToastAndroid.show(
          'Coś poszło nie tak, sprawdź połączenie z siecią',
          ToastAndroid.LONG
        )
      }
    })
  }

  return (
    <View style={styles.membersInputContainer}>
      {tick ? (
        <TextInput
          style={[styles.membersInput, { borderColor: '#A1B7D8' }]}
          value={newMemberID}
          onChangeText={newMemberIDInputHandler}
        />
      ) : (
        <TextInput
          style={styles.membersInput}
          editable={false}
          value={memberName}
        />
      )}

      {myTable && (
        <>
          <Pressable
            style={styles.permissionsInput}
            hitSlop={30}
            onPress={onPressPermissionHandler}
          >
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              editable={false}
              value={isAdmin ? 'Admin' : 'Zwykły'}
            />
          </Pressable>

          {tick ? (
            <Pressable onPress={onPressTickHandler}>
              <Image
                source={require('../assets/images/circle_tick_icon.png')}
                style={styles.icon}
              />
            </Pressable>
          ) : (
            <Pressable onPress={onPressXHandler}>
              <Image
                source={require('../assets/images/circle_x_icon.png')}
                style={styles.icon}
              />
            </Pressable>
          )}
        </>
      )}
      {!myTable && (
        <>
          <View
            style={[
              styles.permissionsInput,
              { borderColor: '#1E1E1E', width: '43%' },
            ]}
          >
            <TextInput
              style={{ color: 'white', textAlign: 'center' }}
              editable={false}
              value={isAdmin ? 'Admin' : 'Zwykły'}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default MembersInputComponent

const styles = StyleSheet.create({
  membersInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  membersInput: {
    grid: 1,
    width: '55%',
    height: '100%',
    marginRight: 5,
    padding: 10,
    backgroundColor: '#303D52',
    color: 'white',
    borderRadius: 5,
    borderWidth: 2,
  },
  permissionsInput: {
    width: '30%',
    height: '100%',
    marginRight: 15,
    padding: 5,
    backgroundColor: '#303D52',
    borderWidth: 2,
    borderColor: '#A1B7D8',
    borderRadius: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
})
