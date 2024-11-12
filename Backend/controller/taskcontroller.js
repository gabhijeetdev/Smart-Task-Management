const Task = require('../models/task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const filter = { userId: req.user.id };
        if (req.query.status) filter.status = req.query.status;
        // Add other filters as needed

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving tasks' });
    }
};


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, category, tags, priority, dueDate, status, recurring } = req.body;
        const task = new Task({ title, description, category, tags, priority, dueDate, status, recurring, userId: req.user.id });
        await task.save();
        res.status(201).json(task); // Return 201 status for resource creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        // Find the task by ID and userId
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

// delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving task' });
    }
};
