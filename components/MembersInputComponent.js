import { useContext, useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native'
import { AuthContext } from '../context/AuthContex'

const MembersInputComponent = ({
  myTable,
  memberName,
  uniqueName,
  tick,
  memberPermission,
  tableID,
}) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const { getData } = useContext(AuthContext)

  useEffect(() => {
    memberPermission && setIsAdmin(true)
  })

  const onPressPermissionHandler = () => {
    console.log('korad')
    console.log(tableID)

    getData(`/table/shared/${tableID}`, 'PUT', {
      user: uniqueName,
      permission: !isAdmin,
    })
      .then((response) => {
        console.log(response)
      })
      .then(setIsAdmin(!isAdmin))
  }

  return (
    <View style={styles.membersInputContainer}>
      <TextInput
        style={styles.membersInput}
        editable={false}
        value={memberName}
      />
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
          <Pressable>
            {tick ? (
              <Image
                source={require('../assets/images/circle_tick_icon.png')}
                style={styles.icon}
              />
            ) : (
              <Image
                source={require('../assets/images/circle_x_icon.png')}
                style={styles.icon}
              />
            )}
          </Pressable>
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
    marginRight: 5,
    padding: 10,
    backgroundColor: '#303D52',
    color: 'white',
    borderRadius: 5,
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
