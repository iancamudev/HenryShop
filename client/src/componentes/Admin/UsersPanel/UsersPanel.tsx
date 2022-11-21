import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllProducts } from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import { getAllUsers } from "../../../redux/slices/AdminSlice/adminActions";
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
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllUsers(currentPage));
  }, [currentPage]);
  const Users = useAppSelector((state) => state.admin.usersList);
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
              Actions
            </th>
          </tr>
          {Users &&
            Users.map((user) => (
              <tr className="border border-slate-300">
                <td
                  className={
                    id % 2 !== 0
                      ? "bg-gray-200 border-black"
                      : "bg-gray-300 border-black"
                  }
                >
                  {id++}
                </td>
                <td
                  className={
                    id % 2 !== 0
                      ? "max-w-1/3 bg-gray-300  border-black"
                      : "max-w-1/3 bg-gray-200  border-black"
                  }
                >
                  {<p className="text-xs font-bold">{user.username}</p>}
                </td>{" "}
                <td
                  className={
                    id % 2 !== 0
                      ? "flex items-center justify-center bg-gray-300 p-2 border-black"
                      : "flex items-center justify-center bg-gray-200 p-2 border-black"
                  }
                >
                  <button
                    onClick={(e) => handleDelete(e)}
                    value={user.id}
                    className="w-12 h-12 p-3 bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                  >
                    <BiX className="w-6 h-6" />
                  </button>
                  {/* <button
                    onClick={(e) => routeChangeToEdit(e)}
                    value={user.id}
                    className="w-12 h-12 p-3 bg-amber-500 hover:bg-amber-700 text-white font-bold  border border-amber-700 rounded hover:duration-500 duration-300"
                  >
                    <BiEdit className="w-6 h-6" />
                  </button> */}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
