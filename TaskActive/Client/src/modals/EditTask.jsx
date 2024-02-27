/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
    setTaskTitle(value);
    } else if (name === 'description') {
    setDescription(value);
    } else if (name === 'deadlineDate') {
    setDeadlineDate(value)
    }
};

useEffect(() => {
    setTaskTitle(taskObj.Title)
    setDescription(taskObj.Description)
    setDeadlineDate(taskObj.DeadlineDate)
},[taskObj.DeadlineDate, taskObj.Description, taskObj.Title])

const handleUpdate = (e) => {
    e.preventDefault();
    taskObj['Title'] = taskTitle;
    taskObj['Description'] = description;
    taskObj['DeadlineDate'] = deadlineDate;
    updateTask(taskObj)
};

return (
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>
        <b>Update Task</b>
    </ModalHeader>
    <ModalBody>
        <form>
        <div className='form-group'>
            <label htmlFor='title'>
            <b>Title</b>
            </label>
            <input
            type='text'
            className='form-control'
            value={taskTitle}
            onChange={handleChange}
            name='title'
            id='title'
            />
        </div>
        <br />
        <div className='form-group'>
            <label htmlFor='description'>
            <b>Description</b>
            </label>
            <textarea
            rows='5'
            className='form-control'
            value={description}
            onChange={handleChange}
            name='description'
            ></textarea>
        </div>
        <br />
        <div className='form-group'>
            <label htmlFor='date'>
            <b>Deadline Date</b>
            </label>
            <br />
            <input
            type='date'
            value={deadlineDate}
            onChange={handleChange}
            name='deadlineDate'
            />
        </div>
        </form>
    </ModalBody>
    <ModalFooter>
        <Button color='primary' onClick={handleUpdate}>
        Update
        </Button>{' '}
        <Button color='secondary' onClick={toggle}>
        Cancel
        </Button>
    </ModalFooter>
    </Modal>
);
};