const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  id: Number,
  keyword: String,
  url: String,
  hoveredCount: Number,
  clickedCount: Number,
  hoveredDates: [Date],
  clickedDates: [Date]
})

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);
