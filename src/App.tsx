import React, {useContext, useState} from "react";
import {TodoList} from "./todo-list/TodoList";
import "./App.scss";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {TodosContext, TodosProvider} from "./todos-context/todos-context";

const queryClient = new QueryClient();

function TodoInput() {
    const [, {createTodoMutation}] = useContext(TodosContext);
    const [inputState, setInputState] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputState) {
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
                    setInputState(value);
                }}
            />
            <button>Create</button>
        </form>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TodosProvider>
                <div className="app">
                    <h1 className="list-title">My List</h1>
                    <TodoInput/>
                    <TodoList/>
                </div>
                <ReactQueryDevtools initialIsOpen={false}/>
            </TodosProvider>
        </QueryClientProvider>
    );
}
