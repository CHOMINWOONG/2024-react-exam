import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AppBar, Toolbar, Button, Input, TextField, Chip, Box } from "@mui/material";
import classNames from 'classnames';

export default function App() {
  const todosState = useTodosState();

  useEffect(() => {
    todosState.addTodo('운동');
    todosState.addTodo('코딩');
    todosState.addTodo('공부');
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if ( form.content.length == 0 ) {
      alert('할 일을 입력해주세요');
      form.content.focus();
      return;

    }

    todosState.addTodo(form.content.value);
    form.content.value= '';
    form.content.focus();
  }

  return (
    <> 
      <AppBar position='fixed'>
        <Toolbar>
          <div className='flex-1'></div>
          <div>TODO</div>
          <div className='flex-1'></div>
        </Toolbar>
      </AppBar>

      <Toolbar/>
      <form onSubmit={onSubmit} className='flex flex-col mt-4 px-4 gap-2'>
      <TextField
        minRows={3}
        maxRows={10}
        multiline
        variant='outlined' 
        name="content" 
        autoComplete="off" 
        label="할 일을 입력해주세요." />

      <Button type="submit" variant='contained'>추가</Button>
      </form>

      <div className='mt-4 px-4'>
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={todo.id} className='mt-10'>
              <div className='flex gap-3'>
                <Chip label={todo.id} variant="outlined" />
                <Chip label={todo.regDate} color="primary" variant="outlined" />
              </div>
              <div className='flex mt-4 shadow rounded-[20px]'>             
                  <Button className='flex-shrink-0 !rounded-[10px_0_0_10px]'>
                    <span 
                      className={
                        classNames(
                          {
                          "text-[color-var(--mui-color-primary-main)]":
                          index % 2 == 0
                          },
                          { "text-[#dfdfdf]" : index % 2 !== 0}
                        )}
                      >
                        <i className="fa-solid fa-check"></i>
                    </span>
                  </Button>
                  <div className='flex-shrink-0 w-[2px] bg-[#dfdfdf] my-5'></div>
                  <div className='flex-grow whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex items-center my-5 mx-3'>
                  {todo.content}
              </div>
                <Button className='flex-shrink-0 !rounded-[0_10px_10px_0]'>
                  <span className='text-[#dfdfdf] text-2xl'>
                    <i className='fa-solid fa-ellipsis-vertical'></i>
                  </span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function useTodosState() {
  const [todos, setTodos] = useState([]);

  const lastTodoIdRef = useRef(0);


  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      regDate: dateToStr(new Date()),  
      content: newContent
    }
    
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index !== index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo

  }  



}

function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  }

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}


