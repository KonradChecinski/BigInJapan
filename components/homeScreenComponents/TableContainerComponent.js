import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TableComponent from './TableComponent'

const TableContainerComponent = ({
  setMyTable,
  isShared,
  setModalVisible,
  setNewTable,
  tables,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isShared ? 'Udostępnione tablice' : 'Moje tablice'}
      </Text>

      {/* Komponenty pojedynczych tablic */}
      {console.log(tables)}
      {tables.map((table) => {
        return (
          <TableComponent
            tableName={table.name}
            tableID={table.id}
            setMyTable={setMyTable}
            isShared={isShared}
            setModalVisible={setModalVisible}
            setNewTable={setNewTable}
          />
        )
      })}
    </View>
  )
}

export default TableContainerComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginBottom: 50,
    backgroundColor: '#E6B77D',
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    color: '#435571',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
})
