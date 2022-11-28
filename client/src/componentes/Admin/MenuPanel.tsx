import React from 'react';
import { Link } from 'react-router-dom';

const MenuPanel = () => {
    let pathname = window.location.pathname;
    let hola = pathname.split('/')
    let path = hola[hola.length-1]
    return (
        <div className='flex flex-col h-screen bg-slate-900 xl:pt-4 xl:px-10 flex-start justify-start text-white text-bold p-0 h-0 w-0 xl:h-screen xl:w-auto'>
            <h4>Panel</h4>
            <div className='border-t-2 border-solid border-gray-200 xl:pt-2 xl:px-5'>
                <Link to='/admin'>
                <h5  className= {path == "admin" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-900 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Products</h5>
                </Link>
                <Link to='/admin/users'>
                <h5 className={path == "users" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-900 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Users</h5>
                </Link>
                <Link to='/admin/payments'>
                <h5 className={path == "payments" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-900 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Payments</h5>
                </Link>
            </div>
        </div>
    );
};

export default MenuPanel;