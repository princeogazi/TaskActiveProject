/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

export const AddTask = ({ modal, toggle, save }) => {
const [taskTitle, setTaskTitle] = useState('');
const [description, setDescription] = useState('');
const [dateCreated, setDateCreated] = useState('');
const [deadlineDate, setDeadlineDate] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
    setTaskTitle(value);
    } else if (name === 'description') {
    setDescription(value);
    } else if (name === 'dateCreated') {
    setDateCreated(value);
    } else if (name === 'deadlineDate') {
    setDeadlineDate(value)
    }
};

const handleSave = async () => {
    try {
        let taskObj = {};
        taskObj['Title'] = taskTitle;
        taskObj['Description'] = description;
        taskObj['DateCreated'] = dateCreated;
        taskObj['DeadlineDate'] = deadlineDate;
        save(taskObj);

        const response = await axios.post('http://localhost:3000/addtask', {taskObj});
        if (response.status === 200) {
            alert('Task created successfully');
            console.log('Task created successfully');
            toggle();
        } else {
            console.error('Error creating task:', response.data);
        }
    } catch (error) {
        console.error('Error creating task:', error.message);
    }
};

return (
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>
        <b>Create A Task</b>
    </ModalHeader>
    <ModalBody>
        <form action='POST'>
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
            <label htmlFor='date created'>
            <b>Date Created</b>
            </label>
            <br />
            <input
            type='date'
            value={dateCreated}
            onChange={handleChange}
            name='dateCreated'
            />
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
        <Button color='primary' onClick={handleSave}>
        Create
        </Button>{' '}
        <Button color='secondary' onClick={toggle}>
        Cancel
        </Button>
    </ModalFooter>
    </Modal>
);
};