import React, { useState, useRef } from 'react';
import classnames from 'classnames';

let NotifyOnce_workDone = false;

function NotifyOnce({children}) {
  const [visivle, setVisible] = useState(false);

  if ( NotifyOnce_workDone == false ) {
    setTimeout(function() {
      setVisible(true);
    }, 1000);

    setTimeout(function() {
      setVisible(false);
    }, 3000);

    NotifyOnce_workDone = true;
  }
  
  return (
    <div
      className={classnames(
        "fixed transition-all right-[10px]",
        {
          "top-[-60px]" : !visivle
        },
        {
          "top-[5px]" : visivle
        }
      )}
    >
      {children}
    </div>
  )
}

function Alert({color:color_, children}) {
  const color = color_ ?? "white";

  return (
    <div role="alert" className="alert alert-info">
      <div className={`text-[${color}]`}>
        <i className="fa-solid fa-face-smile"></i>
        <span>{children}</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <NotifyOnce>
        <Alert>안녕 반가워ㅎㅎ</Alert>
      </NotifyOnce>
      
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, in! Eveniet, ad recusandae. Pariatur distinctio tenetur odit repellendus facilis reiciendis, quo, molestiae eius vitae maxime et quaerat dolores in temporibus.
      </div>

    </>
  );
}



