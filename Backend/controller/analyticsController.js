const Task = require('../models/task');

// Get task history
const getTaskHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(tasks); // Explicitly return 200 status
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get task analytics
const getTaskAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId });
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'completed').length; // Adjusted field for completion check
        const inProgressTasks = totalTasks - completedTasks;
        const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0; // Handle division by zero

        res.status(200).json({
            totalTasks,
            completedTasks,
            inProgressTasks,
            completionRate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTaskHistory,
    getTaskAnalytics,
};
