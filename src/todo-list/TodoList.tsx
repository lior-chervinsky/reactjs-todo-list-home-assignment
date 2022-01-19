import React, {useContext} from "react";
import {TodoListItem} from "./todo-list-item/TodoListItem";

import "./TodoList.scss";
import {Spinner} from "../spinner/spinner";
import {TodosContext} from "../todos-context/todos-context";

export function TodoList() {
    const [
        {todoList, isLoading},
        {updateTodoMutation, deleteTodoMutation}
    ] = useContext(TodosContext);

    const deleteTodoById = (todoId) => deleteTodoMutation({todoId});
    const toggleCompleted = (todoId: number, completed: boolean) => updateTodoMutation({todoId, update: {completed}});


    return (
        <>
            {isLoading ? (
                <Spinner className="progress" label="loading" text="Loading..."/>
            ) : (
                <div className="todo-list-container">
                    <ul className="todo-list">
                        {todoList.map(({title, id, userId, completed}) => {
                            return (
                                /* only pure components won't rerender when parent re-renders*/
                                <TodoListItem
                                    key={id}
                                    todo={{title, id, userId, completed}}
                                    deleteItem={deleteTodoById}
                                    toggleCompleted={toggleCompleted}
                                />
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
