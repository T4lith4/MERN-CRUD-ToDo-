import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';//we will use axios to provide api to deal with HTTP requests

//create a table and store it inside the const Todo so that we can map over and render the todos
//props need to be given to Todo so that we can access the current values that the user has entered for each Todo
const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
            <br/>
            <Link to={"/delete/" + props.todo._id}>Delete</Link>
        </td>
    </tr>
)

//create TodosList Componenet which retrieves the todos with axios
export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

 //as soon as the componenet has mounted, set the data to state and display the response
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //as soon as new data has been saved to the todos,
    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    //map over the array of todos
    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    //render methos which displays the heading, table headings as well as the current state of todo's in table format
    // this.todoList calls on the function which maps over the various todo items inside table format
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}