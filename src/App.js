import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';



function OrderMainFood({setMainFoodCount, mainFoodCount}) {
  return(
  <>
   <h2>메인 (수량 : {mainFoodCount})</h2>
    <div>
      <button className="btn btn-primary" onClick={() => setMainFoodCount(mainFoodCount + 1)}>증가</button>
      <button className="btn btn-primary" onClick={() => setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)}>감소</button>
    </div>
  </>
  )
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({selectedCount, options, toggleAllchecked, btnAllChecked, toggleOptionCheck, optionCheckeds}) {
  return (
    <>
    <h2 className='font-bold'>옵션 ({selectedCount} / {options.length})</h2>
    <label>
      <input type="checkbox" checked={btnAllChecked} onChange={toggleAllchecked}/>전체선택
    </label>
    <ul>
      {options.map((option, index) => (
        <li key={option}>
          <label className='select-none cursor-pointer'>
            <input type="checkbox" checked={optionCheckeds[index]} onChange={() => toggleOptionCheck(index)}/>
            {option}
          </label>
        </li>
      ))}
    </ul>
    </>
  )
}

const MemoizedOrderOptions = React.memo(OrderOptions);

function OrderDelivery({deliveryType, setDeliveryType}) {
  return (
    <>
      <h2 className='font-bold'>배달 옵션</h2>
      <label>
        <input type="radio" name="delivery-type" checked={deliveryType == "직접수령"} onChange={() => setDeliveryType('직접수령')} />직접수령
      </label>
      <label>
        <input type="radio" name="delivery-type" checked={deliveryType == "배달"} onChange={() => setDeliveryType('배달')} />배달
      </label>
    </>
  )
}

const MemoizedOrderDelivery = React.memo(OrderDelivery);

function Order() {
  const [mainFoodCount, setMainFoodCount] = useState(1);
  
  const options = [
    "머스타드", 
    "케챱",
    "마요네즈",
    "갈릭",
    "데리야끼",
    "발사믹",
    "칠리",
    "치즈"
  ];

  const [optionCheckeds, setOptionCheckeds] = useState(new Array(options.length).fill(false));

  const toggleOptionCheck = (index) => {
    const newOptionCheckeds = optionCheckeds.map((el, _index) => _index == index ? !el : el);
    setOptionCheckeds(newOptionCheckeds);
  }

  const btnAllChecked = useMemo(() => optionCheckeds.every((el) => el), [optionCheckeds]);
  const selectedCount = useMemo(() => optionCheckeds.filter(el => el).length, [optionCheckeds]);

  // useCallback으로 랜더링 줄이기
  const toggleAllchecked = useCallback (() => {
    if (btnAllChecked) {
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    }
    
    else {
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
}, [optionCheckeds]);

const [deliveryType, setDeliveryType ] = useState("직접수령");



  return (
    <>
    <h1 className='text-xl font-bold'>음식주문</h1>

    <MemoizedOrderMainFood setMainFoodCount={setMainFoodCount} mainFoodCount={mainFoodCount}/>

    <MemoizedOrderOptions 
      selectedCount={selectedCount}
      options={options}
      toggleAllchecked={toggleAllchecked}
      btnAllChecked={btnAllChecked}
      toggleOptionCheck={toggleOptionCheck}
      optionCheckeds={optionCheckeds}/>

    <MemoizedOrderDelivery deliveryType={deliveryType} setDeliveryType={setDeliveryType}/>

    </>
  );
}

export default function App() {

  return (
    <>
    <Order/>
    </>
  )
}




