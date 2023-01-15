import { Pressable, Image } from 'react-native'

const AddButtonComponent = ({ onPressButton }) => {
  return (
    <Pressable onPress={onPressButton} hitSlop={30}>
      <Image
        source={require('../assets/images/addButton.png')}
        style={{ width: 65, height: 65 }}
      />
    </Pressable>
  )
}

export default AddButtonComponent
