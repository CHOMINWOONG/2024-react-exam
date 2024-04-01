import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';


export default function App() {

  const [todos, setTodos] = useState([]);

  const lastTodoIdRef = useRef(0);


  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      regDate: "2024-04-01 12:12:12",  
      content: newContent
    }
    
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }

  const EditTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index !== index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  

  const onAddBtnClick = () => {
    addTodo('안녕');
  }

  const onRemoveBtnClick = () => {
    removeTodo(1);
  }

  const onEditBtnClick = () => {
    EditTodo(1, '수정됨');
  }

  return (

    <> 
      <button className="btn btn-info" onClick={onAddBtnClick}>추가</button>
      <button className="btn btn-info" onClick={onRemoveBtnClick}>삭제</button>
      <button className="btn btn-info" onClick={onEditBtnClick}>수정</button>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.id} {todo.regDate} {todo.content}
          </li>
        ))}
      </ul>
    </>
  )
}




