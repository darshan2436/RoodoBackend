// backend/models/Routine.js
const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  task: { type: String, required: true },
  frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
  completed: { type: Boolean, default: false },
  added: { type: Date, default: Date.now  },
  updated:{type: Date, default: Date.now },
  email: { type: String, required: true }, //update the schema to include the email field
});

module.exports = mongoose.model('Routine', routineSchema);
