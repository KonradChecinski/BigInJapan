import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({ inTableView }) => {
  return (
    <Pressable
      onPress={() => {
        alert(`addButton. inTableView: ${inTableView}`)
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
