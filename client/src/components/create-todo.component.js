import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
    super(props);
//bind all of the functions which are going to assign the different values to the Todo
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
//in the beginning, the state needs to be empty
this.state = {
    todo_description: ' ',
    todo_resposnsible: ' ',
    todo_priority: ' '
    }
}

//as the input value for the description changes, update it through state to the current value the user enters in
onChangeTodoDescription(e) {
    this.setState({
        todo_description: e.target.value
    });
}

//as the input value for the prioritychanges, update it through state to the current value the user enters in
onChangeTodoPriority(e) {
    this.setState({
        todo_priority: e.target.value
    });
}

//as the input value for responsible changes, update it through state to the current value the user enters in
onChangeTodoResponsible(e) {
    this.setState({
        todo_responsible: e.target.value
    });
}

//on submission of the form, we use e.preventDefault() to prevent the componenet from unnecassarily rerendering.
//we then alert the user that the todo has been created with the description name of the todo the user entered in.
onSubmit(e) {
    e.preventDefault();
    alert(`${this.state.todo_description} has been created`);

  //newTodo needs to be set to accept the new states of the different values that make up the Todo.
    const newTodo = {
        todo_description: this.state.todo_description,
        todo_responsible: this.state.todo_responsible,
        todo_priority: this.state.todo_priority
    }

    //axios is used to process a get request which passes in the values of the new todos.
    axios.post('http://localhost:4000/todos/add', newTodo);
        
    //after submitting, clear the form inputs for a new submit
    this.setState({
        todo_description: ' ',
        todo_responsible: ' ',
        todo_priority: ' '
    })
}
//this render methods needs to display a form with different inputs which have functions updating their values to state as they change.
//onSubmit passes the inputted values into the newTodo variable
    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_description}
                               onChange={this.onChangeTodoDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label> Responsible: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_responsible}
                               onChange={this.onChangeTodoResponsible}
                        />
                    </div>

                    <div className="form-group">
                        <label> Priority: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.todo_priority}
                               onChange={this.onChangeTodoPriority}
                        />
                    </div>

                            <div className="form-group">
                             <input type="submit" value="Create Todo" className="btn btn-primary"/>
                            </div>
                     </form> 
                 </div>
        
             )
    }
}