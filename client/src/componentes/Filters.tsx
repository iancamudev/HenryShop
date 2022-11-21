import React from "react";
import { object } from "yup";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFiltersAction } from "../redux/slices/FiltersSlice/filtersActions";

const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterState.filters);

  const filtersClean = () => {
    let arr = [];
    let key: keyof typeof filters;
    for (key in filters) {
      filters[key].length > 0 && arr.push({ name: key, value: filters[key] });
    }
    return arr;
  };

  const clickHandler = (e: any) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.name;
    dispatch(setFiltersAction({ ...filters, [name]: value }));
  };

  const changeHandler = (e: any) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.selectedOptions[0].value;
    console.log(name, value);
    dispatch(setFiltersAction({ ...filters, [name]: value }));
  };

  const clickHandlerDelete = (e: any) => {
    const name = e.currentTarget.name;
    dispatch(setFiltersAction({ ...filters, [name]: "" }));
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full  mt-6  flex-wrap bg-gray-200 pt-2 pb-2">
      <div className=" h-auto bg-white  rounded-3xl h-12 flex flex-row gap-2 w-auto flex flex-row ">
        {filters &&
          filtersClean().map((el) => (
            <button
              className="m-2 p-1 pl-2 pr-2 rounded-2xl border border-solid border-black text-sm  duration-300 hover:duration-300 hover:bg-gray-200 border-opacity-50 "
              name={el.name}
              key={el.name}
              onClick={clickHandlerDelete}
              id="renderFiltros"
            >
              {el.value === "price" && "Precio"}
              {el.value === "rating" && "Rating"}
              {el.value === "asc" && "Ascendente"}
              {el.value === "desc" && "Descendente"}
              {el.value === "Mate" && "Mates"}
              {el.value === "Gorra" && "Gorras"}
              {el.value === "Remera" && "Remeras"}
            </button>
          ))}
      </div>
      <div className="flex flex-row gap-4">
        <select
          className="p-2 text-base border-2 "
          id="property"
          onChange={(e) => {
            console.log(e);
            changeHandler(e);
          }}
        >
          <option className="text-sm" id="" value="">
            Propiedad
          </option>
          <option className="text-sm" id="property" value="rating">
            Rating
          </option>
          <option className="text-sm" id="property" value="price">
            Precio
          </option>
        </select>
        <select
          className="p-2 text-base "
          id="order"
          onChange={(e) => {
            console.log(e);
            changeHandler(e);
          }}
        >
          <option className="text-sm" value="">
            Orden
          </option>
          <option className="text-sm" value="asc">
            Ascendente
          </option>
          <option className="text-sm" value="desc">
            Descendente
          </option>
        </select>
      </div>

      {/* <div className="flex flex-col items-start  w-96">
        <h5>Ordenar por:</h5>
        <div className="flex flex-row gap-4 text-sm p-1  mt-2 justify-start">
          <p className="p-1">Propiedad:</p>

          <button
            className="p-1 pr-2 pl-2 border-b-2 border-black border-solid rounded-2xl bg-gray-200"
            id="property"
            value="Rating"
            name="rating"
            onClick={clickHandler}
          >
            Rating
          </button>

          <button
            className="p-1 pr-2 pl-2 border-b-2 border-black border-solid rounded-2xl bg-gray-200"
            id="property"
            value="Precio"
            name="price"
            onClick={clickHandler}
          >
            Precio
          </button>
        </div>
        <div className="flex flex-row gap-4 text-sm  p-1  mt-2 items-start">
          <p className="p-1">Orden:</p>

          <button
            className="p-1 pr-2 pl-2 border-b-2 border-black border-solid rounded-2xl bg-gray-200"
            id="order"
            value="Descendente"
            name="desc"
            onClick={clickHandler}
          >
            Descendente
          </button>

          <button
            className="p-1 pr-2 pl-2 border-b-2 border-black border-solid rounded-2xl bg-gray-200"
            id="order"
            value="Ascendente"
            name="asc"
            onClick={clickHandler}
          >
            Ascendente
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Filters;
