// backend/routes/todo.js
const express = require('express');
const Todo = require('../models/Todo'); // Make sure to create the Todo model
const router = express.Router();

// Add new Todo
router.post('/', async (req, res) => {
  const { title, deadline,  added, completedAt, punishment ,email} = req.body;

  try {
    const newTodo = new Todo({
      title,
      deadline,
      added,
      completedAt,
      punishment,
      isCompleted: false,
      email,
    });

    await newTodo.save();
    res.status(201).json({ msg: 'Todo added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  const email = req.query.email;
  try {
    let todos = await Todo.find();
    todos = todos.filter(todo => todo.email === email);
    // if(todos === "[]" || todos.length === 0){
    //   throw new Error("No todos found");
    // }
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//update todo for completed and punishment
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Correct parameter extraction
  const { isCompleted, punishment } = req.body;

  try{
    const updated = await Todo.findByIdAndUpdate(id, { $set: { isCompleted, punishment } }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updated);
  }catch(err){
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;