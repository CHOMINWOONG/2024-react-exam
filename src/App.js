import React, { useState, useRef, useEffect, useMemo } from 'react';
import {Routes, Route, Navigate, useLocation, NavLink, useParams, useNavigate} from "react-router-dom"
import classNames from 'classnames';
import { useRecoilState, atom } from 'recoil';

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    {id: 3, regDate: "2024-04-24 12:12:12", content: "운동"},
    {id: 2, regDate: "2024-04-24 12:12:12", content: "공부"},
    {id: 1, regDate: "2024-04-24 12:12:12", content: "코딩"}
  ]
});

function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const lastTodoIdRef = useRef(todos.length == 0 ? 0 : todos[0].id);

  const addTodo= (content) => {
    // id값을 함수로 정의하여 입력할때마다 id값에 1씩 더하는 수가 변환될 수 있도록 current를 붙여줌
    const id = ++lastTodoIdRef.current;
    const regDate = "2024-04-24 12:12:12";

    const newTodo = {
      id,
      regDate,
      content
    }

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  }


  const findIndexById = (id) => todos.findIndex((todo) => todo.id == id);

  const findTodoById =

  const removeTodoById = (id) => {
    const index = findIndexById(id);

    if ( index == -1 ) return;

    const newTodos = todos.filter((_, _index) => index != _index);
    setTodos(newTodos);
  }

  const modifyTodoById = (id, content) => {
    const index = findIndexById(id);

    if ( index == -1 ) return;

    const newTodos = todos.map((todo, _index) => index == _index ? {...todo, content} : todo);
    setTodos(newTodos);
  }
// 훅을 호출할때는 항상 중괄호 쓰기 {} !!!!!!!!!!!!!
  return {
    todos,
    addTodo,
    removeTodoById,
    modifyTodoById
  };
}

function TodoListItem({todo}) {
  const todosState = useTodosState();
  const [editMode, setEditMode] = useState(false);

  const showEditMode = () => {
    setEditMode(true);
  }
  
  const cancelEditMode = () => {
    setEditMode(false);
  }

  const commitEdit = () => {
    setEditMode(false);
  }

  const onsubmitform = (e) => {
    e.preventDefault();

    const onSubmitEditForm = (e) => {
      e.preventDefault();
  
      const form = e.target;
  
      form.content.value = form.content.value.trim();
  // 아무것도 입력하지 않았을때 텍스트를 보이도록 한다.
      if ( form.content.value.length == 0 ) {
        alert('할 일을 입력해주세요.');
        form.content.focus();
  
        return;
      }

      todosState.modifyTodoById(todo.id, form.content.value);
      setEditMode(false);

    commitEdit();
  }
  return (
    <>
      <li key={todo.id}>
        {todo.id} : {todo.content}
        <NavLink to={`/edit/$`}></NavLink>

        <button className='btn btn-sm'
        onClick={() => window.confirm(`${todo.id}번 할 일을 삭제하시겠습니까 ?`) && 
        todosState.removeTodoById(todo.id)}>
          삭제
        </button>
        
      </li>
    </>
  )
}

function TodoListPage() {
  const todosState = useTodosState();

  return(
    <>
      <h1>할 일 리스트</h1>

      <ul>
        {todosState.todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}/>
        ))}
      </ul>
    </>
  );
}

function TodoEditPage() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const todosState = useTodosState();
  const todo = todosState.findTodoById(id);

  const form = e.target;
  
  form.content.value = form.content.value.trim();
// 아무것도 입력하지 않았을때 텍스트를 보이도록 한다.
  if ( form.content.value.length == 0 ) {
    alert('할 일을 입력해주세요.');
    form.content.focus();

    return;
  }

  
  return (
    <>
    <h1>할 일 수정</h1>
    <form onSubmit={onsubmitform} style={{display: "inline-block"}}>
            <input 
            className="input input-outlind input-sm" 
            type="text" 
            name="content" 
            placeholder='할 일' 
            defaultValue={todo.content} 
            />
            <button type='submit'>수정완료</button>
            <button type='button' onClick={() => Navigate("/list")}>수정취소</button>
          </form>
    </>
  )
}

function TodowritePage() {
  const todosState = useTodosState();

  
  const form = e.target;
  
  form.content.value = form.content.value.trim();
// 아무것도 입력하지 않았을때 텍스트를 보이도록 한다.
  if ( form.content.value.length == 0 ) {
    alert('할 일을 입력해주세요.');
    form.content.focus();

    return;
  }

    todosState.addTodo(form.content.value);
    // 입력 후에 입력창을 초기값으로 돌려놓는다.
    form.content.value = "";
    form.content.focus();
  
    
  }
  return(
    <>
      <h1>할 일 작성</h1>
      {/* Submit을 만들때는 항상 form태그를 쓰고 안에는 input이나 button을 쓴다.  */}
      <form onSubmit={onSubmit}>
        <input className="input input-bordered my-5"autoComplete="off" name="content" type="text" placeholder="할 일을 입력해주세요." />
        <input type="submit" value="작성" className='input input-bordered ml-2' />
      </form>
      <div>
        {todosState.todos.length}
      </div>
    </>
  );
}


export default function App() {
  const location = useLocation();

  return (
    <> 
    <header>
      {/* style : 현재 위치하고 있는 창일때 red색으로 변환하는 스타일 추가 */}
      <NavLink 
        to="/list"
        style={({ isActive }) => ({ color: isActive ? "red" : null })}
      >
        리스트
      </NavLink>
      &nbsp;/&nbsp;
      {/* style : 현재 위치하고 있는 창일때 red색으로 변환하는 스타일 추가 */}
      <NavLink 
        to="/write"
        style={({ isActive }) => ({ color: isActive ? "red" : null })}
        >
        작성
      </NavLink>
      <hr />
      주소 : {location.pathname}
    </header>

    <Routes>
      <Route path="/list" element={<TodoListPage />} />
      <Route path="/write" element={<TodowritePage />} />
      {/* write 페이지로 돌아가는  */}
      <Route path="*" element={<Navigate to="/write" />} />
    </Routes>
    </>
  );
}


