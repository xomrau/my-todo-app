const express = require('express');
const router = express.Router();

const Todo = require('../../models/todos');

router.route('/')
    .get(function(req, res, next){
        Todo.findAsync({})
        .then(function(todos){
            res.json(todos);
        })
        .catch(next)
        .error(console.error);
    });

module.exports = router;