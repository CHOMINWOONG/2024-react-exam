import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    if ( isDark ) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
    <div className='btn'>
      <button onClick={() => setIsDark(!isDark)}>테마토글</button>
    </div>

  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vitae ipsa delectus culpa autem maiores ex, vero consequatur. Delectus optio, totam veniam sint id voluptates voluptatum dolorem sapiente magni odit.
  </div>

  <h1 class="color-primary">
    안녕
    반가워
  </h1>
    </>
  );
}




