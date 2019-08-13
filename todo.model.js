const mongoose = require('mongoose');
const Schema = mongoose.Schema;//use mongoose to define the data structure of the Todo

//all of the inputs will be strings
let Todo = new Schema ({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    }
});

//export the module to use the model Todo
module.exports = mongoose.model('Todo', Todo);