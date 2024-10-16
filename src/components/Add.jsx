import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Add = () => {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const data = {
        url: url,
        name: name,
        pass: pass
    }

    const submitData = (e) => {
        e.preventDefault();
        if (!url && !name && !pass) {
            toast.error("Please fill all the fields");
        } else if (!url) {
            toast.error("Please enter the URL");
        } else if (!name) {
            toast.error("Please enter the name");
        } else if (!pass) {
            toast.error("Please enter the password");
        } else {
            let data1 = JSON.parse(localStorage.getItem("data"));
            if (data1 === null) {
                let arr = [data];
                localStorage.setItem("data", JSON.stringify(arr));
            } else {
                let arr = [...data1, data];
                localStorage.setItem("data", JSON.stringify(arr));
            }
            toast.success("Password added successfully!!");
            // Clear input fields after submission
            setUrl('');
            setName('');
            setPass('');
        }
    }

    return (
        <div className='flex flex-col place-content-center items-center gap-10 min-h-screen bg-gray-50 p-4'>
            <h1 className='text-4xl text-center font-bold text-blue-700 shadow-md p-4 rounded-md bg-white'>Add Password</h1>
            <form action='' className='bg-white shadow-lg rounded-lg p-6 flex flex-col gap-6 w-full max-w-md border border-gray-200'>
                <label htmlFor="url" className='text-sm font-medium text-gray-700'>URL:</label>
                <input
                    className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-400 w-full' // Set width to full
                    type="text"
                    id="url"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    required
                />
                <label htmlFor="username" className='text-sm font-medium text-gray-700'>Username:</label>
                <input
                    className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-400 w-full' // Set width to full
                    type="text"
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <label htmlFor="password" className='text-sm font-medium text-gray-700'>Password:</label>
                <div className='relative'>
                    <input
                        className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-400 w-full pr-10' // Set width to full and right padding for icon
                        type={showPassword ? "text" : "password"}
                        id="password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        required
                    />
                    <span
                        className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-blue-600 transition duration-200'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <button
                    className='p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition duration-200 shadow-lg'
                    onClick={submitData}
                >
                    Add Password
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Add;
