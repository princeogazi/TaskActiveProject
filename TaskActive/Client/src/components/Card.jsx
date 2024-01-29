/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card } from 'react-bootstrap';
import { EditTask } from '../modals/EditTask';
import { useState } from 'react';

const CustomCard = ({taskObj, index, updateList, deleteTask}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
    }

    const updateTask = (obj) => {
        updateList(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }
    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: "chartreuse" }}></div>
            <div className="task-holder">
                <span className="card-header" style={{ backgroundColor: "#F2FAF1", borderRadius: "10px" }}><b>{taskObj.Title}</b></span>
                <p className='mt-3 ml-3'>{taskObj.Description}</p><br/>
                <p><b>Date Created:</b> {taskObj.DateCreated}</p>
                <p><b>Deadline Date:</b> {taskObj.DeadlineDate}</p>
                
                <div style={{ position: "absolute", right: "20px", bottom: "20px" }}><br/>
                    <i className="far fa-edit" style={{ color: "blue", marginRight: "7px", cursor: "pointer" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style={{ color: "red", cursor: "pointer" }} onClick={handleDelete}></i>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj}/>
        </div>
    )
}

export default CustomCard;