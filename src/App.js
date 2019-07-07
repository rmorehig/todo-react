import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h2>React Todos</h2>
      </div>
      <div className="Todo-App">
        <form>
          <input type="text"/>
        </form>
        <div className="Todo-List">
          <ul>
            <li>Learn JSX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
