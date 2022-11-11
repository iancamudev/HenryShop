import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import axios from "axios";

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


<<<<<<< HEAD
const schema = yup.object({
    name: yup.string().required('Debes agregar el nombre del producto'),
    rating: yup.number().min(0).max(5),
=======
const schema = yup.object().shape({
    name: yup.string().required('Debes agregar el nombre del producto'),
    rating: yup.number().min(0).max(5).required("Ingresar valor entre 1 - 5"),
>>>>>>> f9339b90ec3f6e321fba714607aba62e069d5a6b
    description: yup.string().min(1).max(80).required('Debe haber una descripción, máximo 80 caracteres'),
    price: yup.number().required('no olvides agregar el precio del prodcuto'),
    image: yup.string().required('tiene que ser un string'),
    stock: yup.number().required('debes agregar cantidad de stock'),
    category: yup.string().required('recuerda agregar la categoría'),
    colors: yup.array(),
    sizes: yup.array(),
})
    .required();

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: yupResolver(schema)
    });

    const submitForm = handleSubmit((data) => {
        let backData = process.env.REACT_APP_BACKEND_URL;
        if (backData)
            axios.post(`${backData}/products/`, {}).then((res) => {
                console.log(res);
            })
                .catch((err) => console.error(err));
    });

    return (
        <div>
            <form onSubmit={submitForm}
                className="flex justify-center flex-col items-center w-9/12 m-auto"
            >
                <div className="mb-3.5 w-full">
                    <input {...register('name')} type="text" placeholder="Name..." />
                    {errors?.name && (
                        <p className="text-red-600 font-bold">{errors.name.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('rating')} type="text" placeholder="Rating..." />
                    {errors?.rating && (
                        <p className="text-red-600 font-bold">{errors.rating.message}</p>)}

                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('description')} type="text" placeholder="Description..." />
                    {errors?.description && (
                        <p className="text-red-600 font-bold">{errors.description.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('price')} type="text" placeholder="Price..." />
                    {errors?.price && (
                        <p className="text-red-600 font-bold">{errors.price.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('image')} type="text" placeholder="Image..." />
                    {errors?.image && (
                        <p className="text-red-600 font-bold">{errors.image.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('stock')} type="text" placeholder="Stock..." />
                    {errors?.stock && (
                        <p className="text-red-600 font-bold">{errors.stock.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('category')} type="text" placeholder="Category..." />
                    {errors?.category && (
                        <p className="text-red-600 font-bold">{errors.category.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('colors')} type="text" placeholder="Colors..." />
                    {errors?.colors && (
                        <p className="text-red-600 font-bold">{errors.colors.message}</p>)}
                </div>

                <div className="mb-3.5 w-full">
                    <input {...register('sizes')} type="text" placeholder="Sizes..." />
                    {errors?.sizes && (
                        <p className="text-red-600 font-bold">{errors.sizes.message}</p>)}
                </div>

                <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">Agregar producto</button>

            </form>
        </div>
    )

}

export default Form;