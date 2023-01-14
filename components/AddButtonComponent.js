import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({
  setMyTable,
  newTable,
  setNewTable,
  setModalVisible,
  setTableIdState,
}) => {
  return (
    <Pressable
      onPress={() => {
        setTableIdState(null)
        setMyTable(true)
        setNewTable(true)
        setModalVisible(true)
      }}
      hitSlop={30}
    >
      <Image
        source={require('../assets/images/addButton.png')}
        style={{ width: 65, height: 65 }}
      />
    </Pressable>
  )
}

export default AddButtonComponent
