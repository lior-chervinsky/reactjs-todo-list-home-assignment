import React, {memo} from 'react'

import './TodoListItem.scss'


export const TodoListItemPure = memo(TodoListItem)

function TodoListItem({todo, deleteItem, toggleCompleted}) {
    const {title, id, completed} = todo
    const handleClick = (event) => {
        const isCtrlClicked = event.ctrlKey || event.metaKey;

        isCtrlClicked ? deleteItem(id) : toggleCompleted(id, !completed)
    }
    return (
        <li className="todo-list-item" onClick={handleClick} aria-checked={completed ? true : null} aria-label={title}>{title}</li>
    )
}
