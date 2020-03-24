import React from 'react';
import { render, fireEvent, getByText as getByTextWithContainer, waitForDomChange, waitForElementToBeRemoved, wait } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('Should render the app', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText(/Todo description/)).toBeInTheDocument()
    expect(getByText(/Save/)).toBeInTheDocument()
    expect(getByText(/List of Todos/)).toBeInTheDocument()    
  });


  test('Should save a todo', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />)
    const todoInput = getByPlaceholderText(/Todo description/)
    const saveButton = getByText(/Save/)
    const todos = ['new todo 1', 'new todo 2']
    fireEvent.input(todoInput, { target: { value: todos[0] }})
    fireEvent.submit(saveButton)
    await waitForDomChange()
    fireEvent.input(todoInput, { target: { value: todos[1] }})
    fireEvent.submit(saveButton)
    await waitForDomChange()
    // other
    // const todosContainer = getByTestId('todo-list')
    todos.forEach((_, index) => {
      expect(getByText(`${todos[index]}`)).toBeInTheDocument()
      // other
      // expect(getByTextWithContainer(todosContainer, `${todos[index]}`)).toBeInTheDocument()
    })
  })

  test('Should delete a todo', async () => {
    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<App />)
    fireEvent.input(getByPlaceholderText(/Todo description/), { target: { value: 'new todo  '}})
    fireEvent.submit(getByText(/Save/))
    await wait(() => expect(getByText(/new todo/)).toBeInTheDocument())
    expect(queryByText(/new todo/)).toBeInTheDocument()
    fireEvent.click(getByTestId(/delete-todo-0/))
    expect(queryByText(/new todo/)).toBeFalsy()
  })
})
