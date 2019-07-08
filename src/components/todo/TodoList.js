import React from 'react';

export const TodoList = (props) => {
    return(
        <div className="Todo-List">
            <ul>
              {props.todos.map(todo => 
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.isComplete}/>{todo.name}
                  </li>)} 
            </ul>
          </div>
    )
}