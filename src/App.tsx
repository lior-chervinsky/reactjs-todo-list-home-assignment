import React from "react";
import {TodoList} from "./todo-list/TodoList";
import "./App.scss";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {TodosProvider} from "./todos-context/todos-context";
import {TodoInput} from "./todos-input/todos-input";

const queryClient = new QueryClient();

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
