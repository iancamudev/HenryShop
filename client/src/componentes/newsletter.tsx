import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RiMailAddFill } from 'react-icons/ri'
import * as yup from "yup";

interface formData {
    email: string;
}

const schema = yup.object().shape({
    email: yup.string().email("Ingresa un Email válido").required("Debes agregar un email"),
});

const NewsLetter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<formData>({
        resolver: yupResolver(schema),
    });

    const initialForm: formData = {
        email: "",
    };


    let bEnd = process.env.REACT_APP_BACKEND_URL;

    const [email, setEmail] = useState(initialForm)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }




    const submitCall = ({
        email,
    }: formData) => {

        axios.post(`${bEnd}/newsletter`, { email })
        alert('Gracias por suscribirte, Email agregado a la newsletter')
        reset();


    }

    return (
        <form
            onSubmit={handleSubmit(submitCall)}
            className="flex flex-row rounded-md shadow-lg  bg-white border-0 border-b-2 border-black border-solid"
        >

            <input
                {...register("email")}
                onChange={onChange}
                id="email"
                type="text"
                placeholder="Suscríbete..."
                className="text-base text-gray-900 m-2 ml-4 mr-0 w-36"
            >

            </input>
            {errors?.email && (
                <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            )}
            <button
                type='submit'
                className="text-base text-gray-900 pl-3 pr-4 hover:bg-gray-200 rounded-br-md rounded-tr-md"

            >

                <RiMailAddFill className="h-6 w-6 text-gray-600" />
            </button>

        </form>
    )
}

export default NewsLetter;