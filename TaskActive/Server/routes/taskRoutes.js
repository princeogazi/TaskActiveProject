const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    res.json({
        messasge: 'Task routes are working',
        user: req.user});
});

// Create a new task
router.post('/addtask', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id});
        await task.save();
        res.status(201).json({task, message: 'Task Created Successfully'});
    }

    catch (error) {
        res.status(400).send({message: 'Error creating task'});
    }
});

// Get all tasks
router.get('/alltasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id});
        res.status(201).json({tasks, count: tasks.length, message: 'Tasks found successfully'});
        }
    catch (error) {
        res.status(500).send(error);
    }
});

// Get a task by ID
router.get('/:id', auth, async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });
        if (!task) {
        return res.status(404).json({message: 'Task not found!'});
        }
        res.status(200).json({task, message: 'Task found successfully'});

    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a task by ID
router.patch('/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'completed', 'date created', 'deadline date']; 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });
            if (!task) {
            return res.status(404).json({message: 'Task not found!'});
            }
            updates.forEach(update => task[update] = req.body[update]);
            await task.save();
            res.json({task, message: 'Task updated successfully'});
        }
        
        catch (error) {
        res.status(400).send(error);
        }
});

// Delete a task by ID
router.delete('/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).json({message: 'Task not found!'});
            }
            res.json({task, message: 'Task deleted successfully'});

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;