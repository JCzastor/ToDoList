import React, { useContext } from "react";
import { TaskContext } from "../App";

    
function AddTask() {
    const taskContext = useContext(TaskContext);

    function handleOnClick() {
        taskContext?.tasks.push({
            id: Date.now(),
            title:(document.getElementById('title') as HTMLInputElement).value
            });
        taskContext?.setAddTaskMode(false);
    }

    return(
        <div>
            <form>
                <div className="input-group mb-3">
                    <input id="title" type="text" className="form-control" placeholder="Task" aria-label="Task" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleOnClick}>Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddTask;