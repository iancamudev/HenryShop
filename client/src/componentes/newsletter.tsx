import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import {RiMailAddFill} from 'react-icons/ri'

const NewsLetter = () => {

    let bEnd = process.env.REACT_APP_BACKEND_URL;

    const [email, setEmail] = useState('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post(`${bEnd}/newsletter`, { email })	

        setEmail('')
    }

    return (
        <form 
        onSubmit={submitHandler}
        className="flex flex-row rounded-md shadow-lg  bg-white border-0 border-b-2 border-black border-solid"
        >

            <input
                type="email"
                onChange={changeHandler}
                value={email}
                placeholder="Suscríbete..."
                className="text-base text-gray-900 m-2 ml-4 mr-0 w-36"
            >

            </input>
            <button
                type='submit'
                className="text-base text-gray-900 pl-3 pr-4 hover:bg-gray-200 rounded-br-md rounded-tr-md"

            >
                
                <RiMailAddFill className="h-6 w-6 text-gray-600" />
            </button>

        </form>
    )
}

export default NewsLetter