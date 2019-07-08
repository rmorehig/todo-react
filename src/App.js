import React,{Component} from 'react';
import {TodoForm,TodoList} from './components/todo';
import {addTodo,generateId, findById, toggleTodo, updateTodo} from './lib/todoHelpers'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    todos : [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an awesome app', isComplete: false},
      {id: 3, name: 'Ship it!', isComplete: false},
      {id: 4, name: 'Desplegar en la nube', isComplete: false}
    ],
    currentTodo:'',
    errorMessage: ''
  }


  handleToggle = (id) => {
    const todo = findById(id,this.state.todos);
    const toggled = toggleTodo(todo);
    const updatedTodos = updateTodo(this.state.todos,toggled);
    this.setState({
      todos: updatedTodos,
    })
  }

  handleInputChange = (evt) =>{
    this.setState({
      currentTodo: evt.target.value
    });
  }

  handleSubmit = (evt) => {
    const {currentTodo} = this.state;
    //para evitar que refresque la página
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: currentTodo,
      isComplete: false,
    }
    const updatedTodos = addTodo(this.state.todos,newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo:'',
      errorMessage: ''
    })
  }

  handleSubmitEmpty = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render(){
    const {currentTodo,todos,errorMessage} = this.state;
    const submitHandler = currentTodo ? this.handleSubmit : this.handleSubmitEmpty;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <TodoForm currentTodo={currentTodo} 
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}/>
          <TodoList todos={todos} handleToggle={this.handleToggle}/>
        </div>
      </div>
    );
  }
}

export default App;
