import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const AddCardComponent = () => {
  return (
    <Pressable style={{ width: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.plus}>+</Text>
      </View>
    </Pressable>
  )
}

export default AddCardComponent

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
