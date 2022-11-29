import React, { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { setFiltersActionAdmin } from "../../../redux/slices/FiltersSlice/filtersActions";
import { setFiltersActionPayment } from "../../../redux/slices/AdminSlice/adminActions";

const SearchBarPayment = () => {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.admin.filtersPayment);
  const page: number = useAppSelector((state) => state.admin.paymentsPages) as number;
  const navigate = useNavigate();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(setFiltersActionPayment(page, {...filters, id_compra: search }));
    setSearch("");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-row mb-0 shadow-lg  bg-white border-0 border-b-2 border-black border-solid"
    >
      <input
        type="text"
        onChange={changeHandler}
        value={search}
        placeholder="Id de la compra"
        className="text-base text-gray-900 m-2 ml-4 mr-0 w-40"
      />
      <button
        type="submit"
        className=" w-full ml-36 text-base text-gray-900 pl-3 pr-2 hover:bg-gray-200 rounded-br-md rounded-tr-md"
      >
        <BiSearchAlt className="h-6 w-6  text-gray-600 " />
      </button>
    </form>
  );
};

export default SearchBarPayment;