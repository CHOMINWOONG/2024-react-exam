import React, { useState } from 'react';
import ProductListItem from './productListltem';

export default function App(){



return <>
  <div className='flex gap-3'>
    <ProductListItem imgNo={1} name="MAC" price="4,300,000"/>
    <ProductListItem imgNo={2} name="MAC AIR" price="2,300,000"/>
    <ProductListItem imgNo={3} name="MAC PRO" price="3,300,000"/>
  </div>
</>
}

