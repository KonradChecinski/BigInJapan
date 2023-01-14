import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({
  setMyTable,
  newTable,
  setNewTable,
  navigateToMenu,
}) => {
  return (
    <Pressable
      onPress={() => {
        setMyTable(true)
        setNewTable(true)
        console.log(`Stan newTable z pressa: ${newTable}`)
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
