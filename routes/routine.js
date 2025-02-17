// backend/routes/routine.js
const express = require('express');
const Routine = require('../models/Routine'); // Make sure to create the Routine model
const router = express.Router();

async function changeChecked(id , completed){
  const updatedRoutine = await Routine.findByIdAndUpdate(
    id,
    { $set: { completed } },
    { new: true }
  );
  console.log("changed " + updatedRoutine)
  return updatedRoutine;
}

const updateRoutine = (routines)=>{
  const now = new Date();
  routines.map((routine)=>{
    const difference = (now - new Date(routine.added))/(60*60*1000*24)
    if(difference > 1 && routine.frequency === "Daily"){
      changeChecked(routine.id , false)
    } else if(difference > 7 && routine.frequency === "Weekly"){
      changeChecked(routine.id , false)
    } else if(difference > 30 && routine.frequency === "Monthly"){
      changeChecked(routine.id , false)
    }
  })
}

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
  const email  = req.query.email;
  console.log(email);
  try {  
    let routines = await Routine.find();
    routines = routines.filter(routine => routine.email === email);
    // if(routines === "[]" || routines.length === 0){
    //   throw new Error("No routines found");
    // }
    updateRoutine(routines);
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
    const updatedRoutine = changeChecked(id , completed);

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
