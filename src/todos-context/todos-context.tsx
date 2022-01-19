import React, { createContext } from "react";
import { useTodos } from "../hooks/useTodos";

export const TodosContext = createContext(null);

export function TodosProvider({ children }) {
    const todos = useTodos();

    return (
        <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    );
}
