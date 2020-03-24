import React, { useContext } from 'react'
import { Context } from './TodoContext'

const styles = {
  main: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 16,
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  items: {
    padding: 4
  },
  deleteIcon: {
    cursor: 'pointer',
    marginLeft: 12
  }
}

const Main = () => {
  const todoContext = useContext(Context)
  const handleDelete = (id) => () => {
    todoContext.deleteTodo(id)
  }
  const items = todoContext.todos
  return (
      <main style={styles.main}>
          <h2>List of Todos</h2>
          {/* <span>new todo 1</span> */}
          <ul data-testid='todo-list'>
          {Object.keys(items).map((id, index) => (
            <li style={styles.items} key={id}>
              <span data-testid={`todo-${id}`}>{items[id].todo}</span>
              <i data-testid={`delete-todo-${index}`} onClick={handleDelete(id)} style={styles.deleteIcon}>(x)</i>
            </li>
          ))}
          </ul>
      </main>
  )
}

export default Main
