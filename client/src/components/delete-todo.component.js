import React, {Component} from 'react';
import axios from 'axios';

//the DeleteTodo Componenet is responsible for showing the component that was seledcted to be deleted to the user, then once the user clicks the
//delete button, it removes it from the Todo'd
export default class DeleteTodo extends Component {

    constructor(props) {
        super(props);
        //once the
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }
//to display the todo item selected to be deleted
    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
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

    handleClick(e) {
        //alert the user that the specific item has been deleted
        alert(this.state.todo_description + ' has been deleted');
        //prevent the componenet from rerendering unneccessarily
        e.preventDefault();
        //use delete request to delete the specified todo item 
        axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id);
    }

    //this render method is responsible for displaying the different values of item selected to be deleted, along with a delete button
    //which activates the handleClick function which physically removes the todo
    render() {
        return (
            <div>
                <h3>Delete Todo</h3>
                <form>
                    <div className="form-group">
                        <label>Description: </label>
                        <br/>
                        <label>{this.state.todo_description}</label>      
                    </div>

                    <div className="form-group">
                        <label>Responsible: </label>
                        <br/>
                        <label>{this.state.todo_responsible}</label>
                    </div>

                    <div className="form-group">
                        <label>Priority: </label>
                        <br/>
                        <label>{this.state.todo_priority}</label>
                    </div>
                        <br/>

                        <div className="form-group">
                            <button type="button" value="Delete Todo" className="btn btn-primary" onClick={this.handleClick}>Delete</button>
                        </div>  
                </form>
            </div>
        )
    }
}
