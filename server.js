const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');//enable cross-origin-request
const mongoose = require('mongoose');
const todoRoutes = express.Router();//use mongoose to find anf anipulate the todo's
const PORT = 4000;//set port
//use the schema to make a model and assign it to the variable Todo
let Todo = require('./todo.model');

app.use(cors());//express needs to use cors so that the same-origin policy can be relaxed
app.use(bodyParser.json());//express needs to use body parser to retrieve the body of json

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
//inside the console of our command prompt display this message below so that we know connection has been successful
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
//get all the todos 
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
//get a todo item by it's specfic id
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});
//create a todo
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
//edit a todo
todoRoutes.route('/update/:id').put(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//delete a todo
todoRoutes.route('/delete/:id').delete(function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err, todo){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});
//enable routing
app.use('/todos', todoRoutes);
//set up the port
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});