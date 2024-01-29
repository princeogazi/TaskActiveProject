/* eslint-disable react/jsx-key */
import { useState } from "react";
import { AddTask } from "../modals/AddTask";
import Card from "./Card";

function Dashboard() {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        setTaskList(tempList)
        setModal(false)
    }

    const updateList = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        setTaskList(tempList)
        window.location.reload()
    }

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        setTaskList(tempList)
        window.location.reload()
    }

    return(
        <>
        <div className="task-header text-center">
            <h3><b>Tasks</b></h3>
            <button className = "btn btn-primary mt-2" onClick={() => setModal(true)}>New Task</button>
        </div>
        <div className="task-container">
        {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateList={updateList}/>)}
        </div>
        <AddTask modal={modal} toggle={toggle} save={saveTask}/>
        </>
    )
}

export default Dashboard;