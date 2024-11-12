const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controller/taskcontroller');
const { protect } = require('../middleware/authMiddleware'); 

// Get all tasks
router.get('/', protect, getAllTasks);

// Create a task
router.post('/', protect, createTask);

// Update a task
router.put('/:id', protect, updateTask);

// Delete a task
router.delete('/:id', protect, deleteTask);

// Get a task by ID
router.get('/:id', protect, getTaskById);

module.exports = router; 