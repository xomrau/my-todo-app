/**
 * route ./todos will display the todo list
 * app handles any incoming req with /todos in the url
 * create a new router and add our route handler in there, and set it to be used in the app.js
 */


const express = require('express');
const router = express.Router();
const todos = require('../models/todos');

router.get('/', function(req, res) {
  res.render('todos', {title: 'Todos', todos: todos});
});

module.exports = router;

/**
 * identical to routes/index.js but 2 changes
 * 1. creates a todos model by requiring it
 * 2. renders a todos view and passes the todos model to it.
 */