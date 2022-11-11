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


const schema = yup.object({
    name: yup.string().required("Debes agregar el nombre del producto"),
    rating: yup.number().nullable().typeError('Agrega un número entre 0 y 5').min(0, 'el número debe ser mayor o igual a 0').max(5, 'el número debe ser menor o igual a 5'),
    description: yup.string().min(1, 'Se requiere por lo menos un caracter').max(80, 'No se pueden una descripción mayor a 80 caracteres').required(),
    price: yup.number().typeError("No olvides agregar el precio del prodcuto").min(0, 'requiere un precio igual o superior a 0').required(),
    image: yup.string().required("Agrega un enlace de tu imagen"),
    stock: yup.number().typeError("Debes agregar el stock del producto").min(0, 'el valor mínimo debe ser cero').required(),
    category: yup.string().required("Recuerda agregar la categoría"),
    colors: yup.array().nullable(),
    sizes: yup.array().nullable(),
})
    .required();
console.log(schema)
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: yupResolver(schema)
    });

    const submitForm = handleSubmit((data) => {
        let backData = process.env.REACT_APP_BACKEND_URL;
        if (backData)
            axios.post(`${backData}/products`, {}).then((res) => {
                console.log(res);
            })
                .catch((err) => console.error(err));
    });

    return (
        <form onSubmit={submitForm}
            className="flex justify-center flex-col items-center w-9/12 m-auto"
        >
            <div className="mb-3.5 w-full">
                <input {...register('name')} type="text" placeholder="Name..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.name && (
                    <p className="text-red-600 font-bold">{errors.name.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('rating')} type="text" placeholder="Rating..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.rating && (
                    <p className="text-red-600 font-bold">{errors.rating.message}</p>)}

            </div>

            <div className="mb-3.5 w-full">
                <input {...register('description')} type="text" placeholder="Description..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.description && (
                    <p className="text-red-600 font-bold">{errors.description.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('price')} type="text" placeholder="Price..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.price && (
                    <p className="text-red-600 font-bold">{errors.price.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('image')} type="text" placeholder="Image..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.image && (
                    <p className="text-red-600 font-bold">{errors.image.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('stock')} type="text" placeholder="Stock..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.stock && (
                    <p className="text-red-600 font-bold">{errors.stock.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('category')} type="text" placeholder="Category..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.category && (
                    <p className="text-red-600 font-bold">{errors.category.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('colors')} type="text" placeholder="Colors..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.colors && (
                    <p className="text-red-600 font-bold">{errors.colors.message}</p>)}
            </div>

            <div className="mb-3.5 w-full">
                <input {...register('sizes')} type="text" placeholder="Sizes..." className="border border-black border-solid w-full rounded-2xl pl-2 py-1" />
                {errors?.sizes && (
                    <p className="text-red-600 font-bold">{errors.sizes.message}</p>)}
            </div>

            <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">Agregar producto</button>

        </form>
    )

}

export default Form;