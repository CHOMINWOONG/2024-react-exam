import React, { useState } from 'react';

function App() {
  const [num, setNum] = useState(0);
  const onBtnIncreaseClicked = () => {
    setNum( num + 10 );
  }
  const onBtnIncreaseClicke = () => {
    setNum( num - 10 );
  }



  return (
    <>
      NUM : {num}
      <br/>
      <button onClick={() => setNum(num + 1)}>+1</button>
      <button onClick={() => setNum(num - 1)}>-1</button>
      <button onClick={(onBtnIncreaseClicked)}>+10</button>
      <button onClick={(onBtnIncreaseClicke)}>-10</button>
    </>
  );
}

export default App;
