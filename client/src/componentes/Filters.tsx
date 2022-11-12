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
      filters[key].length > 0 && arr.push(filters[key]);
    }
    return arr;
  };
  return (
    <div className="flex flex-col justify-center mt-8">
      <div className="flex flex-col items-center">
        <h5>Filtros actuales: </h5>
        <div className=" h-10 bg-white">
          {filters &&
            filtersClean().map((el) => <div onClick={() => {}}>{el}</div>)}
        </div>
      </div>
      <div>
        <h5>Categorias:</h5>
        <button
          value="Remera"
          onClick={(e) =>
            dispatch(
              setFiltersAction({ ...filters, category: e.currentTarget.value })
            )
          }
        >
          Remera
        </button>
        <div>Gorra</div>
        <div>Mate</div>
      </div>
    </div>
  );
};

export default Filters;
