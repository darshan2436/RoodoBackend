// backend/routes/routine.js
const express = require('express');
const Routine = require('../models/Routine'); // Make sure to create the Routine model
const router = express.Router();

// Add new Routine
router.post('/', async (req, res) => {
  const { task, frequency , completed ,email} = req.body;

  try {
    const newRoutine = new Routine({
      task,
      frequency,
      completed: false, // Default value
      email,
    });

    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all Routines
router.get('/', async (req, res) => {
  const email  = req.params.email;
  try {  
    let routines = await Routine.find();
    routines = routines.filter(routine => routine.email === email);
    // if(routines === "[]" || routines.length === 0){
    //   throw new Error("No routines found");
    // }
    res.json(routines);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});

// Update Routine
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Correct parameter extraction
  const { completed } = req.body;

  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      { $set: { completed } },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.json(updatedRoutine);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Routine
router.delete('/:id', async (req, res) => {
  try {
    await Routine.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Routine deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
