import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./Components/Layout/Header";
import Todos from "./Components/Todos";
import About from "./Components/Pages/About";
import AddTodo from "./Components/AddTodo";


import './App.css';

class App extends Component{
    state = {
        todos: []
    }

    // get request to url to get Todos
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => this.setState({ todos: res.data }))
    }


    // Toggle Complete
    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        }) });
    }

    // Delete Todo
    // delete request
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({ todos: [...this.state.todos.filter
                (todo => todo.id !== id)] }));
    }

    // Add Todo
    addTodo = (title) => {
        // post request to url with data, and UPDATE state with setState( old, 'new' res.data)
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
            // make sure NEW ID
        })
            .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

    }


    // Nested Routs
    // <Link to={`${match.url}/components`}>Components</Link>

  render() {
      return (
          <Router>
              <div className="App">
                  <div className="container">
                      <Header />
                      <Route exact path="/" render={props => (
                          <React.Fragment>
                              <AddTodo addTodo={this.addTodo}/>
                              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                          </React.Fragment>
                      )} />
                      <Route path="/about" component={About} />
                  </div>
              </div>
          </Router>
      );
  }
}

export default App;
