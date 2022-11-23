import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllProducts } from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai"
import { getAllUsers } from "../../../redux/slices/AdminSlice/adminActions";
import axiosPutCall from "../../../funciones/axiosPutCall";
const UsersPanel = () => {
  let navigate = useNavigate();
  const routeChangeToEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let path = `/admin/${event.currentTarget.value}`;
    navigate(path);
  };
  const routeChangeToAddProduct = () => {
    let path = `/Createproduct`;
    navigate(path);
  };
  const dispatch = useAppDispatch();
  const Users = useAppSelector((state) => state.admin.usersList);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllUsers(currentPage));
  }, [currentPage, Users]);
  const Pages = useAppSelector((state) => state.admin.userPages);
  var array: Array<number> = [];
  let id = 1;
  for (let i = 1; i <= Pages; i++) {
    array.push(i);
  }
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    var value = event.target.value;
    var x = value;
    var y: number = +x;
    setCurrentPage(y);
  };
  const token =
  JSON.parse(window.localStorage.getItem("userSession") as string) &&
  (JSON.parse(window.localStorage.getItem("userSession") as string)
    .token as string);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios.delete(`${URL_BACK_DEV}/users/${event.currentTarget.value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    } );
    dispatch(getAllUsers(currentPage));
  };
  const handleEdit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };
  const handleActivate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axiosPutCall(`/users/admin/users/${event.currentTarget.value}`, {})
  }
  return (
    <div className="flex justify-center items-center max-w-xs">
      <div className=" mt-8 mb-8 flex flex-col justify-center shadow">
        <table className="shadow-2xl ">
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2">
            </th>
            <th></th>
            <th>
              Page:
              <select
                className="bg-gray-200 hover:bg-gray-400 rounded"
                onChange={(e) => handleOnChange(e)}
              >
                {Pages &&
                  array.map((pagina: number) => (
                    <option value={pagina}> {pagina}</option>
                  ))}
              </select>
            </th>
          </tr>
          <tr className="border border-black bg-slate-900	text-white rounded-xl ">
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              ID
            </th>
            <th className="border border-black font-normal p-2">Username</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              Status
            </th>
          </tr>
          {Users &&
            Users.map((user) => (
              <tr className="border border-slate-300 ">
                <td
                  className={ user.deleted ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
  
                >
                  {id++}
                </td>
                <td
                  className={ user.deleted ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                >
                  {<p className="text-xs font-bold">{user.username}</p>}
                </td>{" "}
                <td
                    className={ user.deleted ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                > 
                 { user.deleted ? <button
                    onClick={(e) => handleActivate(e)}
                    value={user.id}
                    className="  margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                  >
                    <BiX className="w-6 h-6" />
                  </button> : <button
                    onClick={(e) => handleDelete(e)}
                    value={user.id}
                    className="margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-green-500 hover:bg-green-700 text-white font-bold  border border-green-700 rounded hover:duration-500 duration-300"
                    
                  >
                    <AiOutlineCheck className=" w-4 h-4 ml-1" />
                  </button> }
                  
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
