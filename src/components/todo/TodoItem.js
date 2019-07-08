import React from 'react';

export const TodoItem = (props) => {
    return(
        <li key={props.todo.id}>
        <input type="checkbox" checked={props.todo.isComplete}/>{props.todo.name}
        </li>
    )
}