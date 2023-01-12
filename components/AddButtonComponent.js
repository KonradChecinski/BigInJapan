import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({
  setModalVisible,
  setMyTable,
  setNewTable,
}) => {
  return (
    <Pressable
      onPress={() => {
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
