import React, { useState } from 'react';

function App() {
const [name, setName] = useState("lee");
const [age, setAge] = useState("20");
const [address, setAddress] = useState("대전 둔산동");


return <>
<input type="text" placeholder="이름을 입력해주세요" Value={name} onChange={(e) => {
console.log(e.target.Value);
}}/>
<br/>
<input type="number" placeholder="나이를 입력해주세요" Value={age} onChange={(e) => {
  setAge(e.target.Value);
}}/>
<br/>
<input type="text" placeholder="주소를 입력해주세요" Value={address} onChange={(e) => {
  setAddress(e.target.Value);
}}/>
</>
}

export default App;