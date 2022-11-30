import React, { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { setFiltersActionAdmin } from "../../../redux/slices/FiltersSlice/filtersActions";
import { getAllPayments, setFiltersActionPayment } from "../../../redux/slices/AdminSlice/adminActions";
import { AiOutlineReload } from "react-icons/ai";
const SearchBarPayment = () => {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.admin.filtersPayment);
  const page: number = useAppSelector((state) => state.admin.paymentsPages) as number;
  const navigate = useNavigate();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(setFiltersActionPayment({...filters, id_compra: search }));
    setSearch("");
  };
 const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setFiltersActionPayment({...filters, id_compra: ""}));
 }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-row border-b-2 border-opacity-40 border-gray-500 mb-0 w-full shadow-lg  bg-white border-0 border-b-2 border-black border-solid"
    >
      <input
        type="text"
        onChange={changeHandler}
        value={search}
        placeholder="Id de la compra"
        className="text-base text-gray-900 pl-5 text m-2 ml-4 mr-0 w-4/6"
      />
      <button
        type="submit"
        className=" w-1/6 ml-36 bg-gray-200 text-base text-gray-900 pl-3 pr-2 hover:bg-gray-300 hover:duration-400 duration-300 "
      >
        <BiSearchAlt className="h-6 w-6  text-gray-600 " />
      </button>
      <button className="flex w-[5%] items-center justify-center  rounded-tr-md" onClick={(e) => handleClick(e)}><AiOutlineReload/></button>
    </form>
  );
};

export default SearchBarPayment;