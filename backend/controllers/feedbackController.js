const Feedback = require('../models/Feedback');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ date: -1 });

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, feedback } = req.body;

    if (!name || !feedback) {
      return res.status(400).json({ success: false, message: 'Please provide name and feedback' });
    }

    const newFeedback = await Feedback.create({
      name,
      feedback,
    });

    res.status(201).json({ success: true, feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete feedback (Admin)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
