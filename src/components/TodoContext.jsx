import React, { createContext, useState } from 'react'

export const Context = createContext({
    todos: {},
    setTodo: () => {},
    deleteTodo: () => {}
})

const TodoProvider = ({ handlers = { }, children, initialTodos = {} }) => {
    const [todos, setTodos] = useState(initialTodos)
    
    const onSetTodo = (todo) => {
        const id = new Date().getTime()
        setTodos({ ...todos, [id]: todo })
    }

    const onDeleteTodo = (id) => {
        const { [id]: value, ...newTodos } = todos
        setTodos(newTodos)
    }
    return (
        <Context.Provider value={{
            todos: todos,
            setTodo: handlers.setTodo || onSetTodo,
            deleteTodo: handlers.deleteTodo || onDeleteTodo
        }}>
            {children}
        </Context.Provider>
    )
}

export default TodoProvider
