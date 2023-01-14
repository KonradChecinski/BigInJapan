import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'

const TableComponent = ({
  tableName,
  setMyTable,
  isShared,
  setNewTable,
  tableID,
  setTableIdState,
  setModalVisible,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: 'white' }}>{tableName}</Text>
        <Pressable
          onPress={() => {
            isShared ? setMyTable(false) : setMyTable(true)
            setNewTable(false)
            setTableIdState(tableID)
            setModalVisible(true)
          }}
          hitSlop={15}
        >
          <Image
            source={require('../assets/images/iconCog.png')}
            style={styles.image}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default TableComponent

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#435571',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 25,
    height: 25,
  },
})
