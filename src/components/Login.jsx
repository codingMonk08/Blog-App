    import { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { login as authLogin } from '../store/authSlice';
    import { Button, Input, Logo } from './index';
    import { useDispatch } from 'react-redux';
    import authService from '../appwrite/auth';
    import { useForm } from 'react-hook-form';

    function Login() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { register, handleSubmit } = useForm();
        const [error, setError] = useState('');

        const login = async (data) => {
            setError('');
            try {
                const session = await authService.login(data);
                if (session) {
                    const userData = await authService.getCurrentUser();
                    if (userData) dispatch(authLogin(userData));
                    navigate('/');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        return (
            <div className="flex w-full  text-center  rounded-lg shadow-md items-center justify-center min-h-screen  p-6">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-300">
                    <div className="mb-4 flex justify-center">
                        <span className="inline-block w-24">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Sign in to your account</h2>
                    <p className="text-center text-base text-gray-600 mb-6">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-500 transition-colors duration-200 hover:text-blue-600"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mb-6 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        <div>
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                className="focus:ring-blue-500 focus:border-blue-500"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Email address must be a valid address',
                                    },
                                })}
                            />
                        </div>
                        <div>
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                className="focus:ring-blue-500 focus:border-blue-500"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full shadow-md px-6 py-2 bg-customBlue text-white rounded-md"
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    export default Login;
