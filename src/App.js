import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';


export default function App() {
  const fruits = ['사과', '바나나', '딸기', '포도'];

  const [selecteds, setSelecteds] = useState(new Array(fruits.length).fill(true));

  const toggleFruitSelected = (index) => {
    const newSelecteds = selecteds.map((el, _index) => _index == index ? !el : el);
    setSelecteds(newSelecteds);
  }

  const selectedsFruits = selecteds.map((el, index) => el ? fruits[index] : el).filter(el => el);


  return (
    <>
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>
          <label>
          <input checked={selecteds[index]}type="checkbox" onChange={() => toggleFruitSelected(index)} />
          {fruit}
          </label>
        </li>
      ))}
    </ul>
      <div>
        선택 상태 : {selecteds.join(', ')}
        <hr />
        선택된 과일 : {selectedsFruits.join(', ')}
      </div>
    </>
  );
}




