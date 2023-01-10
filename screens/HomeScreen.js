import { View, StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import TableContainerComponent from '../components/homeScreenComponents/TableContainerComponent'
import AddButtonComponent from '../components/AddButtonComponent'
import { useState } from 'react'
import TableMenuComponent from '../components/homeScreenComponents/TableMenuComponent'

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [myTable, setMyTable] = useState('moja')

  return (
    <>
      <StatusBar style="light" />

      <TableMenuComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        myTable={myTable}
      />

      <LinearGradient
        style={styles.container}
        colors={['#435571', '#161A1D']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView>
          <TableContainerComponent
            isShared={false}
            setMyTable={setMyTable}
            setModalVisible={setModalVisible}
          />
          <TableContainerComponent
            isShared={true}
            setMyTable={setMyTable}
            setModalVisible={setModalVisible}
          />
        </ScrollView>
      </LinearGradient>

      <View style={styles.addButton}>
        <AddButtonComponent
          setModalVisible={setModalVisible}
          setMyTable={setMyTable}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
})
