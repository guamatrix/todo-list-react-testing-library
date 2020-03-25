import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TodoProvider from '../TodoContext'
import Main from '../Main'

describe('Main Component', () => {
  const todos = {
    1: { todo: 'Test 1' },
    2: { todo: 'Test 2' }
  }

  const deleteTodo = jest.fn()

  afterEach(() => {
    deleteTodo.mockClear()
  })

  const WrapperComponent = () => (
    <TodoProvider handlers={{ deleteTodo }} initialTodos={todos}>
      <Main />
    </TodoProvider>
  )

  it('Should show list of todos', () => {
    const { getByTestId } = render(<WrapperComponent />)
    Object.keys(todos).forEach(id => {
      expect(getByTestId(`todo-${id}`)).toHaveTextContent(todos[id].todo)
    })
  })

  it('Should delete a todo', () => {
    const { getByTestId } = render(<WrapperComponent />)
    fireEvent.click(getByTestId(/delete-todo-1/))
    expect(deleteTodo).toHaveBeenCalledWith(String(2))
  })
})