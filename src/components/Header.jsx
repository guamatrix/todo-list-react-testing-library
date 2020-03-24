import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { Context } from './TodoContext';

const styles = {
    header: {
        display: 'flex',
        backgroundColor: 'gray',
        width: '100%',
        height: 150,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
}


const Header = () => {
    const { handleSubmit, register, errors, reset } = useForm();
    const todoContext = useContext(Context)
    const onSubmit = values => {
      todoContext.setTodo(values)
      reset()
    }
    return (
        <header style={styles.header}>            
            <h1>Testing With React</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input
                placeholder="Todo description"
                name="todo"
                ref={register({
                required: 'Required',
                })}
            />
            {errors.todo && errors.todo.message}
            <button type="submit">Save</button>
            </form>
        </header>
    )
}


export default Header
