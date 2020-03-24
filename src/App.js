import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import TodoProvider from './components/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </TodoProvider>
  );
}

export default App;
