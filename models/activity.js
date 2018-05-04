const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  id: String,
  keyword: String,
  hoveredCount: Number,
  clickedCount: Number,
  hoveredDates: [String],
  clickedDates: [String]
})

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);
