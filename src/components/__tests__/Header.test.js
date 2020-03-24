import React from 'react'
import { render, fireEvent, waitForElement, waitForElementToBeRemoved, wait } from '@testing-library/react'
import TodoProvider from '../TodoContext'
import Header from '../Header'

describe('Header Component', () => {
  const setTodo = jest.fn()
  afterEach(() => {
    setTodo.mockClear()
  })

  const WrapperComponnet = () => (
    <TodoProvider handlers={{ setTodo }}>
      <Header />
    </TodoProvider>
  )

  it('Should show imput to save todo with validation', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<WrapperComponnet />)
    const todoInput = getByPlaceholderText(/Todo description/)
    const requiredMessage = /Required/i
    expect(todoInput).toBeTruthy()
    fireEvent.submit(getByText(/Save/i))
    let errorMessage = await waitForElement(() => getByText(requiredMessage))
    expect(errorMessage).toBeTruthy()
    fireEvent.input(todoInput, { target: { value: 'new todo ' }})
    await waitForElementToBeRemoved(() => getByText(requiredMessage)) 
    errorMessage = queryByText(requiredMessage)
    expect(errorMessage).toBeFalsy()
  })

  it('Should save todo', async () => {
    const newTodo = 'new todo'
    const { getByPlaceholderText, getByText } = render(<WrapperComponnet />) 
    const todoInput = getByPlaceholderText(/Todo description/)
    fireEvent.input(todoInput, { target: { value: newTodo }})      
    fireEvent.submit(getByText(/Save/))
    await wait(() => expect(setTodo).toHaveBeenCalled())
    expect(setTodo).toHaveBeenCalledWith({ todo: newTodo })
  })
})
