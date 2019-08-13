import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import all componenets
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
//imoprt image which will be used as the log in the navbar
import logo from "./1.jpg";

//Component App's duty is to render a router navbar which connects the componenets to the routes
class App extends Component {
  render() {
    return (
      <Router>
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://www.google.com">
          <img src={logo} width="30" height="30" alt=""/>
        </a>
        <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
        <Link to="/" className="nav-link">Todos</Link>
        <Link to="/create" className="nav-link">Create Todo</Link>
        </nav>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" exact component={EditTodo} />
        <Route path="/delete/:id" exact component={DeleteTodo} />
        <Route path="/create" exact component={CreateTodo} />
        </div>
    </Router>
    );
  }
}

export default App;

