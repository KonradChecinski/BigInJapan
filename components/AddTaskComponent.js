import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const AddTaskComponent = ({ setTaskMenuVisible, setNewTask }) => {
  return (
    <Pressable
      style={{ width: '100%' }}
      onPress={() => {
        setNewTask(true)
        setTaskMenuVisible(true)
      }}
    >
      <View style={styles.container}>
        <Text style={styles.plus}>+</Text>
      </View>
    </Pressable>
  )
}

export default AddTaskComponent

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#96ACCB',
  },
  plus: {
    fontSize: 40,
    fontWeight: 'bold',
  },
})
