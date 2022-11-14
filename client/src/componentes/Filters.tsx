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

  const clickHandlerDelete = (e: any) => {
    const name = e.currentTarget.name;
    dispatch(setFiltersAction({ ...filters, [name]: "" }));
  };

  return (
    <div className="flex flex-col justify-center mt-8 w-96 ml-6 gap-4">
      <div className="flex flex-col items-start w-96">
        <h5>Filtros actuales: </h5>
        <div className=" h-auto bg-white p-2 rounded-3xl h-12 flex flex-row gap-2 w-52 flex flex-row justify-center">
          {filters &&
            filtersClean().map((el) => (
              <button
                className="p-1 pl-2 pr-2 rounded-2xl border-b-2 border-solid border-black text-sm bg-yellow duration-300 hover:duration-300 hover:bg-white "
                name={el.name}
                key={el.name}
                onClick={clickHandlerDelete}
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
      </div>

      <div className="flex flex-col items-start  w-96">
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
      </div>
    </div>
  );
};

export default Filters;
