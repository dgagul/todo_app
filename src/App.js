import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Components/Layout/Header";
import Todos from "./Components/Todos";
import About from "./Components/Pages/About";
import AddTodo from "./Components/AddTodo";

import './App.css';

class App extends Component{
    state = {
        todos: [
            {
                id: 1,
                title: "Take out the trash",
                completed: false
            },
            {
                id: 2,
                title: "Dinner with wife",
                completed: false
            },
            {
                id: 3,
                title: "Meeting with boss",
                completed: false
            }
        ]
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
    delTodo = (id) => {
        this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
    }

    // Add Todo
    addTodo = (title) => {
        const newTodo = {
            id: 4,
            title: title,
            // or just --> title,
            completed: false
        }
        this.setState({ todos: [...this.state.todos, newTodo] });
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
