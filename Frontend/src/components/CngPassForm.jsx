import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'

function CngPassForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/auth/change-password", data); 

            if(response.data.success){
                reset()
                alert("Password changed successfully, Login Again.!")
                await axios.get("/auth/logout")
                dispatch(logout());
                navigate("/login")
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message
            alert(errorMessage)
            console.error("Password change error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Old Password</label>
                    <input
                        type="text"
                        {...register("oldPassword", { required: "oldPassword is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
                </div>
                <div>
                    <label className="block font-semibold mb-1">New Password</label>
                    <input
                        type="text"
                        {...register("newPassword", { required: "newPassword is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Changing Password..." : "Change Password"}
                </button>
            </form>
        </div>
    );
}

export default CngPassForm;
