import React, { useState, useRef, useEffect, useMemo } from 'react';
import {Routes, Route, Navigate, useLocation, NavLink, useParams, useNavigate} from "react-router-dom"
import classNames from 'classnames';

function HomeMainPage() {
  return (
    <>
      <h1>HOME, MAIN</h1>
    </>
  );
}

function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>ARTICLE, DETAIL</h1>
      <h1>{id}번 게시물 상세 페이지</h1>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  )
}
// 리스트 항목을 만들때 id 값을 부여하여 ARTICLE 클릭시 게시물이 뜸
function ArticleListPage() {
  const articles = [
    {
      id: 1
    },  
    {
      id: 2
    },
  ];

  return (
    <>
      <h1>ARTICLE, LIST</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <NavLink to={`/article/detail/${article.id}`}>
              {article.id}번 게시물
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

function UserLoginPage() {
  return (
    <>
      <h1>USER, LOGIN</h1>
    </>
  );
}

export default function App() {
  const location = useLocation();
  
  return (
    <> 
    <span>현재 주소 : {location.pathname}</span>

    <hr />

{/* NavLink 링크를 달고 싶을때 씀 */}
    <div>
      <NavLink 
      to="/home/main" 
      // isActive 조건문을 달아서 클릭했을때 안했을때 상태 변환설정
      className={({ isActive }) => classNames(
        "btn", 
        {"btn-link" : !isActive },
        {"btn-primary" : isActive }
      )}>
        HOME, MAIN 페이지로 이동
      </NavLink>

      <NavLink 
      to="/article/list" 
      className={({ isActive }) => classNames(
        "btn", 
        {"btn-link" : !isActive },
        {"btn-primary" : isActive }
      )}>
        ARTICLE, LIST 페이지로 이동
      </NavLink>

      <NavLink 
      to="/user/login" 
      className={({ isActive }) => classNames(
        "btn", 
        {"btn-link" : !isActive },
        {"btn-primary" : isActive }
      )}>
        USER, LOGIN 페이지로 이동
      </NavLink>
    </div>
      <Routes>
        <Route path="/home/main" element={<HomeMainPage />} />
        <Route path="/ARTICLE/LIST" element={<ArticleListPage />} />
        <Route path="/ARTICLE/DETAIL" element={<ArticleDetailPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="*" element={<Navigate to="/user/login" />} />
      </Routes>
    </>
  );
}


