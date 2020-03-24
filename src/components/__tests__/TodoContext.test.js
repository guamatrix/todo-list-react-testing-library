import React,  { useContext } from 'react'
import { render, fireEvent } from '@testing-library/react'
import TodoProvider, { Context as TodoContext } from '../TodoContext'

describe('Should provider have todo hanlder methods', () => {
  const setTodo = jest.fn()
  const deleteTodo = jest.fn()

  const TestComponent = () => {
    const todoContext = useContext(TodoContext)
    const totalTodos = Object.keys(todoContext.todos).length
    return (
      <>
        <div>This is a test of todos ({`${totalTodos}`})</div>
        <button onClick={todoContext.setTodo}>On Set Todo</button>
        <button onClick={todoContext.deleteTodo}>On Delete Todo</button>        
      </>
    )
  }

  const initialTodos = { 1: 'test' }

  const Wrapper = () => 
    (<TodoProvider handlers={{ setTodo, deleteTodo }} initialTodos={initialTodos}>
      <TestComponent />
    </TodoProvider>)
  

  afterEach(() => {
    setTodo.mockClear()
    deleteTodo.mockClear()
  })

  it('Should render Todo Provider and called set todos', () => {
    const { getByText } = render(<Wrapper />)
    const totalTodos = Object.keys(initialTodos).length
    expect(getByText(`This is a test of todos (${totalTodos})`))
    expect(setTodo).not.toHaveBeenCalled()
    fireEvent.click(getByText(/On Set Todo/))
    expect(setTodo).toHaveBeenCalled()
  })

  it('Should render Todo Provider Component and delete todos', () => {
    const { getByText } = render(<Wrapper />)
    expect(deleteTodo).not.toHaveBeenCalled()
    fireEvent.click(getByText(/On Delete Todo/))
    expect(deleteTodo).toHaveBeenCalled()
  })
})