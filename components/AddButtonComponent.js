import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({
  setMyTable,
  setNewTable,
  navigateToMenu,
}) => {
  return (
    <Pressable
      onPress={() => {
        setMyTable(true)
        setNewTable(true)
        navigateToMenu()
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
