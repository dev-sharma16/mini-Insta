import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice'

function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/auth/register", data); 
            console.log("Register successful", response.data);
            const user = response.data.userWithoutPassword
            console.log(user);
            dispatch(login(user));
            navigate("/user"); 
        } catch (err) {
            console.error("Login failed", err);
            alert("Invalid username or password");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
                <div>
                    <label className="block font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
