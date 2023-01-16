import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const TaskComponent = ({ taskID, taskName, dateTime }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: 'white' }}>{taskName}</Text>
        <Text style={{ color: 'white', fontSize: 8 }}>
          {dateTime}
        </Text>
      </View>
    </View>
  )
}

export default TaskComponent

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 3,
    padding: 10,
    backgroundColor: '#7B8EAB',
  },
  content: {
    justifyContent: 'space-between',
  },
})
