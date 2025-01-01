// backend/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  added: { type: Date, default: Date.now },
  completedAt: { type: Boolean, default: false },
  punishment: { type: String },
  isCompleted: { type: Boolean, default: false },
  // email: { type: String, required: true },
});

module.exports = mongoose.model('Todo', todoSchema);
