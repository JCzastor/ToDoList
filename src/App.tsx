import { ReactNode, useReducer, ChangeEvent, useState, createContext } from 'react';
import AddTask from './components/AddTask';
import TasksGrid from './components/TasksGrid';
import './components/Style.scss'

type tasksType = {
  id: number,
  title: string
}

const tasksArray: tasksType[] = [];
const deletedTasksArray: tasksType[] = [];

type TaskContextType = {
  tasks: any,
  deletedTasks: any,
  updateTask: React.Dispatch<React.SetStateAction<tasksType[]>>,
  updateDeletedTasks: React.Dispatch<React.SetStateAction<tasksType[]>>,
  AddTaskMode: boolean,
  setAddTaskMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskContext = createContext<null | TaskContextType>(null); 


const App = () => {
  const [AddTaskMode, setAddTaskMode] = useState(false);
  const [tasks, updateTask] = useState(tasksArray);
  const [deletedTasks, updateDeletedTasks] = useState(deletedTasksArray);

  return (
    <TaskContext.Provider value={{tasks, deletedTasks, updateTask, updateDeletedTasks, AddTaskMode, setAddTaskMode}}>
      {AddTaskMode? <AddTask></AddTask> : <TasksGrid></TasksGrid>}
    </TaskContext.Provider>
  )
}
export default App;