import { View, Text, Modal, StyleSheet } from 'react-native'

const TableMenuComponent = ({
  modalVisible,
  setModalVisible,
  myTable,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        {
          setModalVisible(false)
        }
      }}
    >
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>
          Moja tablica: {myTable}
        </Text>
      </View>
    </Modal>
  )
}

export default TableMenuComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
})
