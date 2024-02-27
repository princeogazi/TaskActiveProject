import { useState } from "react";
import { AddTask } from "../modals/AddTask";
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Tasks() {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        setTaskList((prevList) => [...prevList, taskObj]);
        setModal(false);
    }
    
    const updateList = (obj, index) => {
        setTaskList((prevList) => {
            const newList = [...prevList];
            newList[index] = obj;
            return newList;
        });
    }
    
    const deleteTask = (index) => {
        setTaskList((prevList) => {
            const newList = [...prevList];
            newList.splice(index, 1);
            return newList;
        });
    }

    return(
        <>
        <Navbar />
        <div className="task-header text-center">
            <button className = "btn btn-primary mt-2" onClick={() => setModal(true)}>Create A New Task</button>
        </div>
        <h3 className="title-header"><b>Tasks</b></h3>
        <div className="task-container">
        {taskList && taskList.map((obj, index) => <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateList={updateList}/>)}
        </div>
        <AddTask modal={modal} toggle={toggle} save={saveTask}/>
        <Footer />
        </>
    )
}

export default Tasks;