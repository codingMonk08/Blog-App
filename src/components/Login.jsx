import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full text-center rounded-lg shadow-md items-center justify-center min-h-screen p-6 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
        <div className="mb-4 flex justify-center">
          <Logo width="100%" />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-gray-600 dark:text-gray-400 mb-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-colors duration-200 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
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
              className="focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
          </div>
          <div>
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <Button
            type="submit"
            className="w-full shadow-md px-6 py-2 bg-indigo-500  text-white rounded-md dark:text-white"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
