import axios from "axios";
import React, { useEffect} from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
    let backData = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate()
    const RouteToHome = () => {
        let path = '/'
        navigate(path)
    }
    const {token} = useParams();

    useEffect(()=>{
        axios.get(`${backData}/users/confirmation/${token}`)
    }, [])
  return (
    <div className="flex flex-col mt-5 items-center">
      <h1 >Email Confirmado</h1>
      <BsFillCheckSquareFill onClick={RouteToHome}className="h-10 w-10 text-green-600 hover:h-12 hover:w-12 hover:text-green-400 hover:duration-400 duration-300" />
    </div>
  );
};

export default Confirmation;
