const express = require('express');
const router = express.Router();

const Todo = require('../../models/todos');

router.route('/') 
    .get(function(req, res, next){ //GET /api/todos - get todo list
        Todo.findAsync({})
        .then(function(todos){
            res.json(todos);
        })
        .catch(next)
        .error(console.error);
    })
    .post(function(req, res, next){ //POST /api/todos text: String 
        var todo = new Todo(); //created new Todo Object
        todo.text = req.body.text; //add text field passed in the body of the POST req
        todo.saveAsync() 
        .then(function(todos){ //on success, send json obj back with status of the req n todo object itself
            console.log('success');
            res.json({'status': 'success', 'todos': todos});
        })
        .catch(function(e){
            console.log('fail');
            res.json({'status': 'error', 'error': e});
        })
        .error(console.error);
    });

router.route('/:id')
    .get(function(req, res, next){ //GET /api/todos/:id
        Todo.findOneAsync({_id: req.params.id}, {text: 1, done: 1})
        .then(function(todos){
            res.json(todos)
        })
        .catch(next)
        .error(console.error);
    })
    .put(function(req, res, next){ //PUT /api/todos/:id (body add key:value you want to change)
        var todo = {};
        for (var prop in req.body){
            todo[prop] = req.body[prop];
        }
        Todo.updateAsync({_id: req.params.id}, todo)
        .then(function(updatedTodo){
            return res.json({'status': 'success', 'todos': updatedTodo});
        })
        .catch(function(e){
            return res.json({'status': 'fail', 'error': e})
        })
        .error(console.error);
    });

module.exports = router;