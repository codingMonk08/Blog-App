import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);

      // Show toast notification if account already exists
      if (error.message.includes("User already exists")) {
        toast.error(
          "Account already exists. Please sign in or use a different email."
        );
      }
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex w-full text-center rounded-lg shadow-md items-center justify-center min-h-screen p-6 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
        <div className="mb-4 flex justify-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Sign up to create an account
        </h2>
        <p className="text-center text-base text-gray-600 dark:text-gray-400 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 transition-colors duration-200 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mb-6">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              {...register("name", { required: "Full name is required" })}
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              label="Email: "
              placeholder="name@example.com"
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

          {/* Password Input */}
          <div>
            <Input
              label="Password: "
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              {...register("password", { required: "Password is required" })}
            />
            {/* Toggle Password Visibility Button */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
                className="mr-2"
              />
              <label className="text-gray-600 dark:text-gray-400">
                {passwordVisible ? "Hide Password" : "Show Password"}
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full shadow-md px-6 py-2 bg-indigo-500  text-white rounded-md  dark:text-white"
          >
            Sign up
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
