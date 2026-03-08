const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Feedback routes
router.get('/', feedbackController.getAllFeedback);
router.post('/', feedbackController.createFeedback);
router.delete('/:id', protect, authorize('admin'), feedbackController.deleteFeedback);

module.exports = router;
