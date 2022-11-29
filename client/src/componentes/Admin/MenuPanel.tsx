import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resourceLimits } from 'worker_threads';
import { BiUser } from 'react-icons/bi'
import { array } from 'yup';
const MenuPanel = () => {
    const REACT_APP_BACKEND_URL: string = process.env
    .REACT_APP_BACKEND_URL as string;
    let pathname = window.location.pathname;
    let hola = pathname.split('/')
    let path = hola[hola.length-1]
    const token = JSON.parse(
        window.localStorage.getItem("userSession") as string
      );
    const [userProps, SetUserProps] = useState('')
    useEffect(()=>{
        getUser();
    }, [])
    const getUser = async () => {
        const result = await axios.get(
          `${REACT_APP_BACKEND_URL}/users/getuser/${token?.username}`
        );
        SetUserProps(result.data.name);
        console.log(result.data)
      };
 let arraylado = ["0", "5", "10", "20"];
//     let cantidad = 0;
//     let lado = "t";
    
//     setTimeout(()=> {
//         if(cantidad >= 3){
//             cantidad = 0;
//             lado = arraylado[cantidad]
//         } else {
//         lado = arraylado[cantidad++]
//         }
//     }, 1000);
//   console.log(lado)
// const [currentSide, setCurrentSide] = useState(0)

// const nextImg = () => {
//     clearInterval(myInterval);
//     if(currentSide > arraylado.length ){
//         setCurrentSide(0);
//     }
//     setCurrentSide(currentSide === arraylado.length - 1 ? 0 : currentSide + 1);
//   };
// let myInterval: any;
// useEffect(() => {
//     myInterval = setInterval(nextImg, 3000);
//   }, [currentSide]);
//   console.log(arraylado[currentSide])
    return (
        <div className='invisible xl:visible flex flex-col h-screen bg-slate-900 xl:pt-4 xl:px-10 flex-start justify-start xl:items-center text-white text-bold p-0 h-0 w-0 xl:h-screen xl:w-auto'>
            <div className={`relative flex flex-col items-center xl:px-4 xl:pt-4 xl:rounded-full xl:border-2 xl:border-yellow xl:border-opacity-80 xl:shadow-xl`} >
              <BiUser className='xl:h-12 xl:w-12'/>
              <h5 className='mb-4'>{userProps}</h5>
            </div>
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