import { useContext, useState} from "react";
import { TaskContext } from "../App";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Style.scss';

function TasksGrid() {
    
    const taskContext = useContext(TaskContext);
    const [tasks, updateTask] = useState(taskContext?.tasks);
    const [deletedTasks, updateDeletedTasks] = useState(taskContext?.deletedTasks);
    const [AddTaskMode, setAddTaskMode] = useState(false);

    function handleOnClick(){
        taskContext?.setAddTaskMode(true);
    }

    function deleteTask(id: any){
        const taskID = tasks.findIndex((tId:any) => tId.id === id);
        const items = Array.from(tasks);
        const deletedItems = Array.from(deletedTasks);
        taskContext?.deletedTasks.push(tasks[taskID]);
        deletedItems.push(tasks[taskID]);
        taskContext?.tasks.splice(taskID, 1);
        items.splice(taskID, 1);
        updateDeletedTasks(deletedItems);
        updateTask(items);
    }

    function handleOnDragEnd(result : any) {
        if (!result.destination) return;
      
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateTask(items);
      }

    return(
        <>
            <TaskContext.Provider value={{tasks, deletedTasks, updateTask, updateDeletedTasks, AddTaskMode, setAddTaskMode}}>
            <button id="AddTaks" type="button" onClick={handleOnClick}>Add Task</button>
            <div id="container">
                <h5>To Do</h5>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='tasks'>
                    {(provided) => (
                    <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map(({id, title} : any, index:any) => {
                        return (
                            <Draggable key={String(id)} draggableId={String(id)} index={index}>
                                {(provided) => (
                                    <li className="list-group-item" onClick={() => deleteTask(id)} key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <p key={id}>{title}</p>
                                    </li>
                                )}
                            </Draggable>
                        );
                        })}
                        {provided.placeholder}
                    </ul>
                    )}        
                    </Droppable>
                </DragDropContext>
                <div id="deletedTasks">
                    <h5>Done</h5>
                    <ul className="list-group">
                        {deletedTasks?.map((task:any) => {
                            return (
                                <li className="list-group-item disabled" key={task.id}>
                                    <p id="deletedTasksP" key={task.id}>{task.title}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            </TaskContext.Provider>
        </>
    )
}

export default TasksGrid;