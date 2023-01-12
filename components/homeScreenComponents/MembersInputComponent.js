import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native'

const MembersInputComponent = ({ isAdmin, setIsAdmin }) => {
  return (
    <View style={styles.membersInputContainer}>
      <TextInput style={styles.membersInput} editable={false} />
      <Pressable
        style={styles.permissionsInput}
        hitSlop={30}
        onPress={() => setIsAdmin(!isAdmin)}
      >
        <TextInput
          style={{ color: 'white', textAlign: 'center' }}
          editable={false}
          value={isAdmin ? 'Admin' : 'Zwykły'}
        />
      </Pressable>
      <Pressable>
        <Image
          source={require('../../assets/images/circle_x_icon.png')}
          style={styles.xIcon}
        />
      </Pressable>
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
  xIconContainer: {},
  xIcon: {
    width: 28,
    height: 28,
  },
})
