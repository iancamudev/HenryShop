/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { getProductsById } from "../../redux/slices/ProductSlice/productActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImageToFirebaseStorage } from "../../firebase/uploadImageToFirebaseStorage";

const sizes = { XS: "XS", S: "S", M: "M", L: "L", XL: "XL", XXL: "XXL" };
const colors = { Blanco: "Blanco", Negro: "Negro" };
interface formData {
  name: string;
  rating: number;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  colors: Array<string>;
  sizes: Array<string>;
}

const schema = yup
  .object({
    name: yup.string().required("Debes agregar el nombre del producto"),
    rating: yup
      .number()
      .typeError("El rating debe ser un número")
      .min(0, "el número debe ser mayor o igual a 0")
      .max(5, "el número debe ser menor o igual a 5")
      .nullable()
      .transform((v, o) => (o === "" ? null : v)),
    description: yup
      .string()
      .min(0, "Se requiere por lo menos un caracter")
      .max(80, "No se pueden una descripción mayor a 80 caracteres")
      .required(),
    price: yup
      .number()
      .typeError("El precio debe ser un número")
      .min(0, "requiere un precio igual o superior a 0")
      .required("No olvides agregar el precio del prodcuto"),
    image: yup.string().required("Agrega un enlace de tu imagen"),
    stock: yup
      .number()
      .typeError("Debes agregar el stock del producto")
      .min(0, "el valor mínimo debe ser cero")
      .required(),
    category: yup.string().required("Recuerda agregar la categoría"),
    colors: yup
      .array()
      .of(yup.string().oneOf(Object.values(colors)))
      .nullable(),
    sizes: yup
      .array()
      .of(yup.string().oneOf(Object.values(sizes)))
      .nullable(),
  })
  .required();

// --------------------------------------------------------------------------------------

const FormPutProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);
  const Product = useAppSelector((state) => state.products.productDetail);
  console.log(Product);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });
  const initialForm: formData = {
    name: "",
    rating: 0,
    description: "",
    price: 0,
    image: "",
    stock: 0,
    category: "",
    colors: [""],
    sizes: [""],
  };
  const [input, setInput] = useState(initialForm);
  const [imgTemp, setImgTemp] = useState("");
  const [file, setFile] = useState(null);

  let imgUrl: any;
  let imgSrc: any;
  let imgFile: any;
 
  const imagePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const target =  e.target as HTMLInputElement;
    imgSrc = target.files?.[0];
    setFile(imgSrc)
    console.log(imgSrc);
    let arr: string = "";
    
    
      imgFile =  URL.createObjectURL(imgSrc);
      arr = imgFile;
      console.log("hola", imgFile);
      setImgTemp(arr);
    

  };
  const submitForm =  (
    async ({
      name,
      rating,
      description,
      price,
      image,
      stock,
      category,
      colors,
      sizes,
    }:formData) => {
      let backData = process.env.REACT_APP_BACKEND_URL;
      imgUrl =  await uploadImageToFirebaseStorage(file);
      console.log(imgUrl);
      if( imgUrl && backData){
        axios
        .put(`${backData}/products/${id}`, {
          name,
          rating,
          description,
          price,
          image: imgUrl,
          stock,
          category,
          colors,
          sizes,
        })
        .then((res) => {
          console.log(res);
          alert("Se actualizo el producto");
          navigate("/admin")
        })
        .catch((err) => console.error(err));
       }
       else if (!imgUrl && backData) {
        axios
        .put(`${backData}/products/${id}`, {
          name,
          rating,
          description,
          price,
          stock,
          category,
          colors,
          sizes,
        })
        .then((res) => {
          console.log(res);
          alert("Se actualizo el producto");
          navigate("/admin")
        })
        .catch((err) => console.error(err));
       }

      });

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >
      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Name..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            defaultValue={`${Product.name}`}
          />
          *
        </div>
        {errors?.name && (
          <p className="text-red-600 font-bold">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <input
          {...register("rating")}
          id="rating"
          type="text"
          placeholder="Rating..."
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          defaultValue={`${Product.rating}`}
        />
        {errors?.rating && (
          <p className="text-red-600 font-bold">{errors.rating.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Description..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            defaultValue={`${Product.description}`}
          />
          *
        </div>
        {errors?.description && (
          <p className="text-red-600 font-bold">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("price")}
            id="price"
            type="text"
            placeholder="Price..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            defaultValue={`${Product.price}`}
          />
          *
        </div>
        {errors?.price && (
          <p className="text-red-600 font-bold">{errors.price.message}</p>
        )}
      </div>
      
      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          
          <input
            {...register("image")}
            id="image"
            type="file"
            onChange={(e) => imagePreview(e)}
            placeholder="Image..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        <div>
          {
            imgTemp ? <div><p> Imagen nueva <img className="h-40 " src={imgTemp}/> </p></div> : <></>
          }  
      </div>
        <div>
          {
            Product.image ? <div><p> Imagen actual <img className="h-40 " src={Product.image}/> </p></div> : <></>
          }  
      </div>
        {errors?.image && (
          <p className="text-red-600 font-bold">{errors.image.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("stock")}
            id="stock"
            type="text"
            placeholder="Stock..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            defaultValue={`${Product.stock}`}
          />
          *
        </div>
        {errors?.stock && (
          <p className="text-red-600 font-bold">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("category")}
            id="category"
            type="text"
            placeholder="Category..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            defaultValue={`${Product.category}`}
          />
          *
        </div>
        {errors?.category && (
          <p className="text-red-600 font-bold">{errors.category.message}</p>
        )}
      </div>

      <div className="my-5 border border-black border-solid w-full rounded-2xl pl-2 py-1">
        Selecciona los colores
        <div className="my-2 flex justify-center">
          {Object.values(colors).map((color) => {
            return (
              <label key={color} htmlFor={color}>
                <div className="mx-5 ">
                  <input
                    value={color}
                    {...register("colors")}
                    id="colors"
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-blue-200 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    defaultChecked={true}
                  />
                  <label className="w-5/12">{color}</label>
                </div>
              </label>
            );
          })}
          {errors?.colors && (
            <p className="text-red-600 font-bold">{errors.colors.message}</p>
          )}
        </div>
      </div>
      <div className="my-5 border border-black border-solid w-full rounded-2xl pl-2 py-1">
        Selecciona la talla
        <div className="my-2 flex justify-center">
          {Object.values(sizes).map((size) => {
            return (
              <label key={size} htmlFor={size}>
                <div className="mx-5 ">
                  <input
                    value={size}
                    {...register("sizes")}
                    id="sizes"
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-blue-200 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    defaultChecked={true}
                  />
                  <label className="w-5/12">{size}</label>
                </div>
              </label>
            );
          })}
          {errors?.sizes && (
            <p className="text-red-600 font-bold">{errors.sizes.message}</p>
          )}
        </div>
      </div>
      <span>* Campos obligatorios</span>
      <button className="my-5 bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">
        Editar producto
      </button>
    </form>
  );
};

export default FormPutProduct;
function async(arg0: ({ name, rating, description, price, image, stock, category, colors, sizes, }: formData) => void) {
  throw new Error("Function not implemented.");
}

