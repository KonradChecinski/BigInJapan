import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import TableComponent from './TableComponent'

const TableContainerComponent = ({
  setMyTable,
  isShared,
  setNewTable,
  tables,
  setTableIdState,
  navigation,
  setModalVisible,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isShared ? 'Udostępnione tablice' : 'Moje tablice'}
      </Text>

      {/* Komponenty pojedynczych tablic */}
      {/* {console.log(tables)} */}
      {tables.map((table) => {
        return (
          <Pressable
            style={{ width: '100%' }}
            key={table.table_id}
            onPress={() =>
              navigation.navigate('Table', {
                tableID: table.table_id,
                tableName: table.name,
                tablePermission: table.permission,
              })
            }
          >
            <TableComponent
              tableName={table.name}
              tableID={table.table_id}
              setTableIdState={setTableIdState}
              setMyTable={setMyTable}
              isShared={isShared}
              setNewTable={setNewTable}
              setModalVisible={setModalVisible}
            />
          </Pressable>
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
  },
  title: {
    color: '#435571',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
})
