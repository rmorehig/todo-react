import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {TodoForm,TodoList,Footer} from './components/todo';
import {addTodo,generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {loadTodos, createTodo} from './lib/todoService'
import {pipe, partial} from './lib/utils'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    todos : [],
    currentTodo:'',
    errorMessage: ''
  }

  static contextTypes = {
    route: PropTypes.string,
  }

  componentDidMount() {
    loadTodos()
    .then(todos => this.setState({todos}))
  }
  

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos,id)
    this.setState({
      todos: updatedTodos,
    })
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id,this.state.todos);
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
    createTodo(newTodo)
      .then(()=> this.showTempMessage('Todo added'))
  }

  showTempMessage = (msg) => {
    this.setState({message:msg})
    setTimeout(() => this.setState({message:''}), 2500)
  }

  handleSubmitEmpty = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  
  render(){
    const {currentTodo,todos,errorMessage,message} = this.state;
    const submitHandler = currentTodo ? this.handleSubmit : this.handleSubmitEmpty;
    const displayTodos = filterTodos(todos,this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {errorMessage && <span className='error'>{errorMessage}</span>}
          {message && <span className='success'>{message}</span>}
          <TodoForm currentTodo={currentTodo} 
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}/>
          <TodoList todos={displayTodos} handleToggle={this.handleToggle} handleRemove={this.handleRemove}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
