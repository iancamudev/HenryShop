import React, { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoading } from "../redux/slices/ProductSlice";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";
import ProductCard from "./ProductCard";
import { Loading } from "./Loading";
// const gifLoading = require("../assets/gifLoading.gif");

const ProductCards = () => {
  const Products = useAppSelector((state) => state.products.productList);
  const filters = useAppSelector((state) => state.filterState.filters);
  const loading = useAppSelector((state) => state.products.loading );
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts(null, filters));
    
  }, [dispatch, filters]);
   
 if(loading){
  
  return (
    <div>
      <Loading/>
    </div>
  )
 }
   
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h3 className="p-4">Nuestros Productos🚀</h3>
        <div className="bg-yellow h-3 negative"></div>
      </div>

        {
         Products.length ?
              Products.map((producto, index) => {
              return <ProductCard key={index} product={producto} />;})
              :
              <div>
              <p>No se encontraron productos</p>
              
              </div>
             
        }
        
    </div>
  );
   
};

export default ProductCards;
