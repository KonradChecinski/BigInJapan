import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import TaskComponent from './TaskComponent'
import AddTaskComponent from './AddTaskComponent'
import { AuthContext } from '../context/AuthContex'
import TaskMenuComponent from './TaskMenuComponent'

const PanelComponent = ({
  panelID,
  panelName,
  panelOrder,
  tableID,
  setPanelMenuVisible,
  loaderOrEmpty,
  setPanelName,
  setPanelOrder,
  setNewPanel,
  setPanelIDState,

  panels,
  setTableScreenUpdated,
  tableScreenUpdated,
}) => {
  const { getData } = useContext(AuthContext)
  const [tasks, setTasks] = useState(null)
  const [taskMenuVisible, setTaskMenuVisible] = useState(false)

  const [taskNameState, setTaskNameState] = useState('')
  const [taskDescriptionState, setTaskDescriptionState] = useState('')
  const [panelNameState, setPanelNameState] = useState('')
  const [taskDateState, setTaskDateState] = useState('')
  const [taskTimeState, setTaskTimeState] = useState('')
  const [taskOrderState, setTaskOrderState] = useState('')
  const [newTask, setNewTask] = useState(true)
  const [taskIDState, setTaskIDState] = useState(null)

  const [panelUpdated, setPanelUpdated] = useState(0)

  const fetchTasks = () => {
    getData(`/table/${tableID}/panel/${panelID}/task`, 'GET').then(
      (response) => {
        console.log('useEffect z PanelComponent')
        setTasks(response.result)
      }
    )
  }
  useEffect(() => {
    fetchTasks()
  }, [panelUpdated, tableScreenUpdated])

  const loaderHandler = (data) => {
    loaderOrEmpty(data)
  }

  const onPressTaskHandler = (
    taskName,
    taskDescription,
    taskDateTime,
    taskOrder,
    taskID
  ) => {
    let dateTimeSplit = taskDateTime.split(' ')
    let taskDate = dateTimeSplit[0]
    let taskTime = dateTimeSplit[1]

    setTaskNameState(taskName)
    setTaskDescriptionState(taskDescription)
    setTaskDateState(taskDate)
    setTaskTimeState(taskTime)
    setTaskOrderState(taskOrder)
    setTaskIDState(taskID)

    setNewTask(false)
    setTaskMenuVisible(true)
  }

  return (
    <>
      <TaskMenuComponent
        taskMenuVisible={taskMenuVisible}
        setTaskMenuVisible={setTaskMenuVisible}
        taskName={taskNameState}
        taskDescription={taskDescriptionState}
        taskDate={taskDateState}
        taskTime={taskTimeState}
        taskPanel={panelName}
        setTaskNameState={setTaskNameState}
        setTaskDescriptionState={setTaskDescriptionState}
        setPanelNameState={setPanelNameState}
        setTaskDateState={setTaskDateState}
        setTaskTimeState={setTaskTimeState}
        newTask={newTask}
        taskOrder={taskOrderState}
        setTaskOrderState={setTaskOrderState}
        setPanelUpdated={setPanelUpdated}
        panelUpdated={panelUpdated}
        tableID={tableID}
        panelID={panelID}
        taskID={taskIDState}
        setTaskIDState={setTaskIDState}
        panels={panels}
        setTableScreenUpdated={setTableScreenUpdated}
        tableScreenUpdated={tableScreenUpdated}
      />

      <View style={styles.container}>
        <Pressable
          onPress={() => {
            setNewPanel(false)
            setPanelName(panelName)
            setPanelOrder(panelOrder)
            setPanelIDState(panelID)
            setPanelMenuVisible(true)
          }}
          hitSlop={25}
        >
          <Text style={styles.title}>{panelName}</Text>
        </Pressable>

        <View style={{ width: '100%' }}>
          {/* Tu będą taski */}
          {tasks ? (
            <>
              {tasks.map((task) => {
                return (
                  <Pressable
                    key={task.id}
                    onPress={() => {
                      onPressTaskHandler(
                        task.name,
                        task.description,
                        task.datetime,
                        task.order,
                        task.id
                      )
                    }}
                  >
                    <TaskComponent
                      taskID={task.id}
                      taskName={task.name}
                      dateTime={task.datetime}
                    />
                  </Pressable>
                )
              })}
            </>
          ) : (
            loaderHandler(tasks)
          )}
        </View>

        <AddTaskComponent
          setTaskMenuVisible={setTaskMenuVisible}
          setNewTask={setNewTask}
        />
      </View>
    </>
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
