import React, { useState } from 'react';

export default function App(){


   const [no, setNo] = useState(0);

    const [recordedNo, setRecordedNo] = useState([]);
    const saveNo = (e) => {
      e.preventDefault();
      // 기본적으로 이벤트를 막는다

      if ( no == '') {
        alert('숫자를 입력해주세요.');
        return;
      }

    setRecordedNo([...recordedNo, no]);
    setNo('');
    
  }

  const li = recordedNo.map((el, index) => <li key={index}>{el}</li>)

  return <>
    <form>
      <input type="number" className="input input board" value={no} onChange={(e) => setNo(e.target.valueAsNumber)}/>
      <button type="submit" className="btn" onClick={saveNo}>기록</button>
    </form>

    <hr />
    
    <div className='text-4xl'>기록된 숫자 : v1</div>
    {recordedNo.join(',')}
    
    <div className='text-4xl'>기록된 숫자 : v2</div>
    <ul>{li}</ul>

    <div className='text-4xl'>기록된 숫자 : v3</div>
    <ul>
      {recordedNo.map((el, index) => <li key={index}>{el}</li>)}
    </ul>
  </>

  // 반복문 없이 'map' 사용하여 배열 만들기
  // index를 map 앞에 붙이면 index값도 불러올 수 있음.
            // [0,1,2,3,4,5,6,7] *index*
  // const nums = [1,2,3,4,5,6,7,8];
  // const arr = nums.map((el, index) => <li key={index}>내용 {el}</li>);

}

