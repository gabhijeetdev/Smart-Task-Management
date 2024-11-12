const express = require('express');
const { getTaskAnalytics , getTaskHistory } = require('../controller/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get analytics data
router.get('/', protect, getTaskAnalytics, getTaskHistory);

module.exports = router;