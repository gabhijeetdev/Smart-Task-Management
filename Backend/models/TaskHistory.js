const mongoose = require('mongoose');

const TaskHistorySchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TaskHistory', TaskHistorySchema);   