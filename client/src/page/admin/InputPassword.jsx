import React, { useState } from 'react'

import { PiEye } from "react-icons/pi"
import { PiEyeSlash } from "react-icons/pi"

const InputPassword = ({ onChange, placeholder, id, name }) => {
    const [showPassword, setShowPassword] = useState({
        type: 'password',
        status: false
    })

    const handlePasswordButton = () => {
        let updated = {}

        if(!showPassword.status){
            updated = {
                type: 'text',
                status: true
            }
        }else{
            updated = {
                type: 'password',
                status: false
            }
        }

        setShowPassword(updated)
    }

    return (
        <div className='flex border border-gray-500 rounded-md px-3 py-1 outline-none'>
            <input type={showPassword.type} name={name} id={id} placeholder={placeholder} onChange={onChange} className='w-full pass_input'/>
            <button type='button' className='text-gray-500 max-w-fit' onClick={handlePasswordButton}>
                {showPassword.status ? <PiEyeSlash /> : <PiEye />}
            </button>
        </div>
    )
}

export default InputPassword