import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'

const TableComponent = ({ tableName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: 'white' }}>{tableName}</Text>
        <Pressable
          onPress={() => {
            alert(`Cog button: ${tableName}`)
          }}
          hitSlop={15}
        >
          <Image
            source={require('../../assets/images/iconCog.png')}
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
