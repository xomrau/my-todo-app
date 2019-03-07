/**
 * want our app to display the list of todos from the db but for now just a file returns JSON object for test purposes
 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Promise = require('bluebird');
Promise.promisifyAll(mongoose);

let TodoSchema = new Schema({
    text: {type: 'String', required: true},
    done: {type: 'Boolean'}
});

const Todo = mongoose.model('Todo', TodoSchema);

/*
let todos =  [
    'groceries shopping',
    'finish assignment',
    'do the laundry',
    'do the dishes'
];
*/ 

module.exports = Todo;