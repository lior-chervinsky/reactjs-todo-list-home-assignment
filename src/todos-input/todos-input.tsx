import React, {useContext, useState} from "react";
import {TodosContext} from "../todos-context/todos-context";

export function TodoInput() {
    const [, {createTodoMutation}] = useContext(TodosContext);
    const [inputState, setInputState] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputState) {
            console.log('TodoInput-handleSubmit')
            createTodoMutation({todo: {title: inputState, completed: false}});
            setInputState("");
        }
    }
    return (
        <form className="todos-list-input"
              onSubmit={handleSubmit}
        >
            <input
                value={inputState}
                onChange={(e) => {
                    const {value} = e.target;
                    if (inputState || value) {
                        console.log('TodoInput-onChange')
                        setInputState(value);
                    }
                }}
            />
            <button>Create</button>
        </form>
    );
}