import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import React from 'react'
import TaskComponent from './TaskComponent'
import AddTaskComponent from './AddTaskComponent'

const PanelComponent = ({
  panelID,
  panelName,
  panelOrder,
  setTaskMenuVisible,
  setPanelMenuVisible,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setPanelMenuVisible(true)
        }}
        hitSlop={25}
      >
        <Text style={styles.title}>
          {panelName} {panelID} {panelOrder}
        </Text>
      </Pressable>

      <ScrollView style={{ width: '100%' }}>
        {/* Tu będą taski */}
        <Pressable
          onPress={() => {
            setTaskMenuVisible(true)
          }}
        >
          <TaskComponent />
        </Pressable>
        <Pressable
          onPress={() => {
            setTaskMenuVisible(true)
          }}
        >
          <TaskComponent />
        </Pressable>
        <Pressable
          onPress={() => {
            setTaskMenuVisible(true)
          }}
        >
          <TaskComponent />
        </Pressable>
      </ScrollView>

      <AddTaskComponent setTaskMenuVisible={setTaskMenuVisible} />
    </View>
  )
}

export default PanelComponent

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginBottom: 25,
    backgroundColor: '#E6B77D',
    borderRadius: 8,
  },
  title: {
    color: '#435571',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
})
