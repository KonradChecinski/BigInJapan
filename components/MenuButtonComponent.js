import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const MenuButtonComponent = ({ text, color, onPressButton }) => {
  return (
    <Pressable onPress={onPressButton}>
      <View
        color={color}
        style={[styles.buttonContainer, { backgroundColor: color }]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Pressable>
  )
}

export default MenuButtonComponent

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})
