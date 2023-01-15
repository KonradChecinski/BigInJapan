import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import React from 'react'
import CardComponent from './CardComponent'
import AddCardComponent from './AddCardComponent'

const ListComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListComponent</Text>

      <ScrollView style={{ width: '100%' }}>
        {/* Tu będą karty */}
        <Pressable>
          <CardComponent />
        </Pressable>
        <Pressable>
          <CardComponent />
        </Pressable>
        <Pressable>
          <CardComponent />
        </Pressable>
      </ScrollView>

      <AddCardComponent />
    </View>
  )
}

export default ListComponent

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginBottom: 50,
    backgroundColor: '#E6B77D',
    borderRadius: 8,
  },
  title: {
    color: '#435571',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
})
