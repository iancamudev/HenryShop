import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getAllProducts,
  getAllProductsAdmin,
} from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import FiltersProductsAdmin from "./FiltersProductsAdmin";
import SearchBarProducts from "./SearchBarProducts";
import Swal from "sweetalert2";
const ProductsPanel = () => {
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
  const Products = useAppSelector((state) => state.products.productListAdmin);
  let id = 1;
  const filters = useAppSelector((state) => state.filterState.filtersAdmin);
  const { productPages } = useAppSelector((state) => state.products);
  var array: Array<number> = [];
  for (let i = 1; i <= productPages; i++) {
    array.push(i);
  }
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllProductsAdmin(currentPage, filters));
  }, [currentPage]);
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    var value = event.target.value;
    var x = value;
    var y: number = +x;
    setCurrentPage(y);
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios
      .delete(`${URL_BACK_DEV}/products/${event.currentTarget.value}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> El producto fue <h4 style='color: #DD2E2E; font-weight: 700'>deshabilitado</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `<h4>No se ha podido deshabilitar el producto!, ${err.message}</h4>`,
          timer: 2000,
        });
      });
    dispatch(getAllProductsAdmin(currentPage, filters));
  };
  const handleActivate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios
      .put(`${URL_BACK_DEV}/products/activate/${event.currentTarget.value}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> El producto fue <h4 style='color: #008000; font-weight: 700'>habilitado</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `<h4>No se ha podido habilitar el producto!, ${err.message}</h4>`,
          timer: 2000,
        });
      });
    dispatch(getAllProductsAdmin(currentPage, filters));
  };
  return (
    <div className="flex flex-col justify-center content-center items-center xl:w-10/12 w-full">
      <div className=" mt-8 mb-8 flex flex-col bg-slate-900 justify-center xl:w-10/12 shadow">
        <FiltersProductsAdmin />
        <SearchBarProducts />
        <table className="shadow-2xl">
          <tr>
            <th></th>
            <th className="w-12"> </th>
            <th className="w-12"> </th>
            <th></th>
          </tr>
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2">
              <button
                onClick={routeChangeToAddProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded hover:duration-500 duration-300"
              >
                <AiOutlinePlus />
              </button>
            </th>
            <th></th>
            <th></th>
            <th>
              Page:
              <select
                className="bg-gray-200 hover:bg-gray-400 rounded"
                onChange={(e) => handleOnChange(e)}
              >
                {productPages &&
                  array.map((pagina: number) => (
                    <option value={pagina}> {pagina}</option>
                  ))}
              </select>
            </th>
          </tr>
          <tr className="border border-black bg-slate-900	text-white rounded-xl ">
            <th className="border border-black font-normal xl:w-1/12">ID</th>
            <th className="border border-black font-normal p-2 xl:w-2/4">
              Nombre
            </th>
            <th className="border border-black font-normal xl:w-3/12 p-2 pl-4 pr-4">
              Precio
            </th>
            <th className="border border-black font-normal xl:w-3/12 p-2 pl-4 pr-4">
              Actions
            </th>
          </tr>
          {Products &&
            Products.map((producto) => (
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
                  {<p className="text-xs font-bold">{producto.name}</p>}
                </td>{" "}
                <td
                  className={
                    id % 2 !== 0
                      ? " flex items-center justify-center bg-gray-300 p-2 border-black h-auto"
                      : " flex  items-center justify-center bg-gray-200 p-2 border-black h-auto"
                  }
                >
                  {
                    <p className="text-xs font-bold items-center justify-center p-3 m-3 ">
                      ${producto.price[producto.price.length - 1]}
                    </p>
                  }
                </td>
                <td className={id % 2 !== 0 ? "bg-gray-300" : "bg-gray-200"}>
                  <div
                    className={
                      id % 2 !== 0
                        ? "flex flex-row gap-1 bg-gray-300 h-auto justify-center"
                        : "flex flex-row gap-1 bg-gray-200 h-auto justify-center"
                    }
                  >
                    {producto.deleted ? (
                      <button
                        onClick={(e) => handleActivate(e)}
                        value={producto.id}
                        className="flex w-12 h-12 items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                      >
                        <BiX className="w-6 h-6" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleDelete(e)}
                        value={producto.id}
                        className="flex w-12 h-12 items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold  border border-green-700 rounded hover:duration-500 duration-300"
                      >
                        <AiOutlineCheck className="w-6 h-6" />
                      </button>
                    )}
                    <button
                      onClick={(e) => routeChangeToEdit(e)}
                      value={producto.id}
                      className="flex w-12 h-12 items-center justify-center bg-amber-500 hover:bg-amber-700 text-white font-bold  border border-amber-700 rounded hover:duration-500 duration-300"
                    >
                      <BiEdit className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default ProductsPanel;
