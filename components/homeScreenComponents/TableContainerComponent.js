import { View, Text, StyleSheet } from 'react-native'
import TableComponent from './TableComponent'

const TableContainerComponent = ({ myTables }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {myTables ? 'Moje tablice' : 'Udostępnione tablice'}
      </Text>

      {/* Komponenty pojedynczych tablic */}

      <TableComponent tableName={'Test'} bgColor="#435571" />
      <TableComponent tableName={'Test2'} bgColor="black" />
      <TableComponent tableName={'Test3'} bgColor="white" />
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
