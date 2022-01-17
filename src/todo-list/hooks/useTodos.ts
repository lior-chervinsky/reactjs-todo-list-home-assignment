import {deleteTodo, getTodos, updateTodo} from "../../api";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Todo} from "../../utils/todo.interface";
import {MutateProps} from "../../utils/api.interface";

const TODO_QUERY_KEY = 'todos'

export function useTodos(): any {
    // Queries
    const {isLoading, data: todoList} = useQuery<Array<Todo>>(TODO_QUERY_KEY, getTodos)

    const queryClient = useQueryClient()

    // Mutations
    const updateTodoMutation = useMutation(updateTodo, {
        onMutate: async (mutatedTodo: MutateProps) => {
            const {todoId, update} = mutatedTodo
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(TODO_QUERY_KEY)

            // Snapshot the previous value
            const previousTodos: Array<Todo> = queryClient.getQueryData(TODO_QUERY_KEY)

            // Optimistically update to the new value
            queryClient.setQueryData(TODO_QUERY_KEY, (old: Array<Todo>) => {
                return old.map(todo => todo.id === todoId ? {...todo, ...update} : todo)
            })

            // Return a context object with the snapshotted value
            return {previousTodos}
        },
        onSettled: (newTodo, error, variables, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (error) {
                queryClient.setQueryData(TODO_QUERY_KEY, context.previousTodos)
            }
            // Always refetch after error or success:
            // queryClient.invalidateQueries(TODOS_QUERY_KEY)
        },
    })

    const deleteTodoMutation = useMutation(deleteTodo, {
        onMutate: async (todo) => {
            const {todoId} = todo
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(TODO_QUERY_KEY)

            // Snapshot the previous value
            const previousTodos: Array<Todo> = queryClient.getQueryData(TODO_QUERY_KEY)

            // Optimistically update to the new value
            queryClient.setQueryData(TODO_QUERY_KEY, (old: Array<Todo>) => {
                return old.filter(todo => todo.id !== todoId)
            })

            // Return a context object with the snapshotted value
            return {previousTodos}
        },
        onSettled: (newTodo, error, variables, context: any) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (error) {
                queryClient.setQueryData(TODO_QUERY_KEY, context.previousTodos)
            }
            // Always refetch after error or success:
            // queryClient.invalidateQueries(TODOS_QUERY_KEY)
        },
    })

    return [{todoList, isLoading}, updateTodoMutation, deleteTodoMutation]
}