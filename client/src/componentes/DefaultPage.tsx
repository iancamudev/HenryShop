import React from 'react';
import chinchulin from '../assets/Chinchulin.png'

const DefaultPage = () => {
  return (
    <div className='mt-8 w-9/12 rounded-2xl max-w-xl'>
      <h5 className='w-10/12 m-auto my-4 font-bold'>La página que ha ingresado no existe</h5>
      <img src={chinchulin} alt='404_image' className='w-9/12 m-auto my-4 rounded-2xl' />
    </div>
  );
};

export default DefaultPage;