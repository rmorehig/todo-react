import React,{Component} from 'react';
import {TodoForm,TodoList} from './components/todo';
import {addTodo,generateId} from './lib/todoHelpers'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos : [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build an awesome app', isComplete: false},
        {id: 3, name: 'Ship it!', isComplete: false},
        {id: 4, name: 'Desplegar en la nube', isComplete: false}
      ],
      currentTodo:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(evt){
    this.setState({
      currentTodo: evt.target.value
    });
  }

  handleSubmit(evt){
    //para evitar que refresque la página
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false,
    }
    const updatedTodos = addTodo(this.state.todos,newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo:''
    })
  }

  render(){
    const {currentTodo,todos} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <TodoForm currentTodo={currentTodo} 
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}/>
          <TodoList todos={todos}/>
        </div>
      </div>
    );
  }
}

export default App;
