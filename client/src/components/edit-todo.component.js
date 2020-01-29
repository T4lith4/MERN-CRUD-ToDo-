import React, {Component} from 'react';
import axios from 'axios';

//EditTodo is resposible for updating all of the values that make up the todo through state 
export default class EditTodo extends Component {
    constructor(props) {
        super(props);
//bind all functions which are going to update the values that make up the todo
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            
        }
    }
//retrieve the todo by it's specific id of the todo item that was selected to be edited
    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority
                  
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        alert(this.state.todo_description + " has been edited")
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
        };
        axios.put('http://localhost:4000/todos/update/'+ this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.setState.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.setState.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>

                    <div className="form-group">
                        <label>Priority: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.setState.todo_priority}
                                onChange={this.onChangeTodoPriority}
                                />
                    </div>   
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    
                </form>
            </div>
        )
    }
}
