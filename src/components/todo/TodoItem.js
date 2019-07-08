import React from 'react';
import PropTypes from 'prop-types'

export const TodoItem = (props) => {
    const handleToggle = props.handleToggle.bind(null,props.id);
    return(
        <li>
        <input type="checkbox" onChange={handleToggle} 
        checked={props.isComplete}/>{props.name}
        </li>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
}