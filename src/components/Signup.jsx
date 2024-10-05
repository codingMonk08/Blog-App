import { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate('/');
                
            }
        } catch (error) {
            setError(error.message);
    
            // Show toast notification if account already exists
            if (error.message('User already exists')) {
                toast.error('Account already exists. Please sign in or use a different email.');
            }
        }
    };

    return (
        <div className="flex w-full text-center rounded-lg shadow-md items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-300">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-24">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Sign up to create an account</h2>
                <p className="text-center text-base text-gray-600 mb-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 text-center mb-6">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    {/* Full Name Input */}
                    <div>
                        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                id="website-admin"
                                placeholder="Enter your full name"
                                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('name', { required: 'Full name is required' })}
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email-address-icon"
                                placeholder="name@example.com"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Email address must be a valid address',
                                    },
                                })}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {/* Toggle Password Visibility Button */}
                            <div
                                className="absolute inset-y-0 end-0 flex items-center px-2 cursor-pointer"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c2.36 0 4.515.786 6.142 2.088m3.34 3.913c-.273 4.05-4.064 7-8.482 7-2.36 0-4.515-.786-6.142-2.088M12 5v.01"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.343A9.956 9.956 0 002 12c.273 4.05 4.064 7 8.482 7 2.36 0 4.515-.786 6.142-2.088m1.39-2.81A9.969 9.969 0 0022 12c0-4.05-3.732-7.308-8.482-7.308a9.956 9.956 0 00-6.657 2.659M15 12a3 3 0 11-6 0"
                                        ></path>
                                    </svg>
                                )}
                            </div>
                        </div>
                        {/* Password Requirements */}
                        
<Button
type="submit"
className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
>
Create Account
</Button>

                </form>
            </div>
        </div>
    );
}

export default Signup;


